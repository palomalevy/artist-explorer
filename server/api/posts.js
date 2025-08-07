const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client')
const { scorePost } = require('../utils/scorePosts');
const { fetchCoordinates } = require('../utils/fetchCoordinates');
const { uploadPost } = require('../middleware/storagePost')
const prisma = new PrismaClient();
const posts = express.Router()

// [POST] create a new post
posts.post('/createPosts', uploadPost.array('images'), async (req, res) => {

  try {
      const postImages = req.files.map(file => `storagePost/${file.filename}`);

      const { title, zipcode, caption, follow, musicURL, userID, postGenre, postEventType } = req.body
      const coordinates = await fetchCoordinates(zipcode);
          if (!coordinates) {
              return res.send({ message: 'Invalid zipcode or failed to fetch coordinates' })
          }
      const { latitude, longitude } = coordinates;

      const postData = await prisma.post.create({
            data: {
                title,
                zipcode: parseInt(zipcode),
                latitude,
                longitude,
                caption,
                musicURL,
                follow,
                authorId: parseInt(userID),
                postImages,
                postGenre,
                postEventType
            },
            include: {
                author: true,
            },
        });

        res.json(postData);
    } 
    catch (error) {
      console.error(error)
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    }
});

// Temporary. Displays posts by most recent.
posts.get('/postInfo', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true },
      orderBy: { createdAt: 'desc'},
    });

    res.json(posts);

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

posts.post('/followingPosts', async (req, res) => {
  const userID = req.body.userID

  try {

    const user = await prisma.user.findUnique({
      where: { id: userID },
      select: { following: true },
    });

    const posts = await prisma.post.findMany({
      where: {
        authorId: { in: user.following }
      },
      include: { author: true },
      orderBy: { createdAt: 'desc'},
    })

    res.json({posts: posts});

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

posts.post('/myPosts', async (req, res) => {
  
  const userID = req.body.userID

  try {
    const posts = await prisma.post.findMany({
      where: { authorId: Number(userID)},
      orderBy: { createdAt: 'desc'},
      include: { author: true },
    });
    
    res.json({posts: posts});

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const feedCache = new Map();

// 1. New endpoint to generate the feed snapshot
posts.post('/generate-feed', async (req, res) => {
  try {
    const { userID } = req.body;

    // --- All your scoring logic from the original endpoint goes here ---
    const user = await prisma.user.findUnique({
      where: { id: userID },
      select: {
        genres: true,
        eventType: true,
        likedPosts: true,
        zipcode: true,
        imageURL: true,
      },
    });

    const likedPosts = await prisma.post.findMany({
      where: { id: { in: user.likedPosts || [] }},
      select: {
        id: true,
        postGenre: true,
        postEventType: true,
        zipcode: true,
      },
    });

    const likedPostIds = user.likedPosts || [];

    const rawPosts = await prisma.post.findMany({
        where: {
          authorId: { not: userID },
          id: { notIn: likedPostIds },
        },
        include: {
          author: true, // <-- This will get all fields, including pfp
        },
        });

    const scoredPosts = await Promise.all(
      rawPosts.map(async (post) => {
        const score = await scorePost(post, user, likedPosts);
        return { ...post, score };
      })
    );
      
    scoredPosts.sort((a, b) => b.score - a.score || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    // --- Snapshot creation ---
    const sortedPostIds = scoredPosts.map(p => p.id);
    const snapshotId = crypto.randomUUID(); // Generate a unique ID for this feed

    // Store the ordered list of IDs. Set a TTL (Time To Live), e.g., 1 hour
    feedCache.set(snapshotId, sortedPostIds);
    setTimeout(() => feedCache.delete(snapshotId), 3600 * 1000); // Clear after 1hr

    // --- Fetch and return the FIRST page along with the snapshotId ---
    const POSTS_PER_PAGE = 10;
    const firstPageIds = sortedPostIds.slice(0, POSTS_PER_PAGE);
    
    const firstPagePosts = await prisma.post.findMany({
      where: { id: { in: firstPageIds } },
      include: { author: true },
    });
    
    // Re-add score and maintain original sort order
    const postsWithScore = firstPagePosts
      .map(post => ({
        ...post,
        score: scoredPosts.find(p => p.id === post.id)?.score,
      }))
      .sort((a, b) => sortedPostIds.indexOf(a.id) - sortedPostIds.indexOf(b.id));

    res.json({
      posts: postsWithScore,
      snapshotId: snapshotId,
      hasMore: sortedPostIds.length > POSTS_PER_PAGE,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating feed' });
  }
});


// 2. Modified endpoint to fetch subsequent pages
posts.post('/discoverPosts', async (req, res) => {
  try {
    const { snapshotId, page = 2 } = req.body; // Default to page 2 now

    const sortedPostIds = feedCache.get(snapshotId);

    if (!sortedPostIds) {
      return res.status(404).json({ message: 'Feed session expired. Please refresh.' });
    }

    const POSTS_PER_PAGE = 10;
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const pageIds = sortedPostIds.slice(startIndex, startIndex + POSTS_PER_PAGE);

    if (pageIds.length === 0) {
      return res.json({ posts: [], hasMore: false });
    }
    
    const postsForPage = await prisma.post.findMany({
      where: { id: { in: pageIds } },
      include: { author: true },
    });

    // Ensure the posts are returned in the correct, pre-sorted order
    const orderedPosts = postsForPage.sort((a, b) => pageIds.indexOf(a.id) - pageIds.indexOf(b.id));

    res.json({
      posts: orderedPosts,
      hasMore: startIndex + POSTS_PER_PAGE < sortedPostIds.length,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});


module.exports = posts;