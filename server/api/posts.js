const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client')
const { scorePost } = require('../utils/scorePosts');
const { fetchCoordinates } = require('../utils/fetchCoordinates');
const prisma = new PrismaClient();
const posts = express.Router()

// [POST] create a new post
posts.post('/createPosts', async (req, res) => {
    const { title, zipcode, caption, follow, postImages = [], musicURL, userID, postGenre, postEventType } = req.body
    
    const coordinates = await fetchCoordinates(zipcode);
        if (!coordinates) {
            return res.send({ message: 'Invalid zipcode or failed to fetch coordinates' })
        }
    
    const { latitude, longitude } = coordinates;

    try {
        const postData = await prisma.post.create({
            data: {
                title,
                zipcode,
                latitude,
                longitude,
                caption,
                musicURL,
                follow,
                authorId: userID,
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

posts.post('/discoverPosts', async (req, res) => {
  try {
    const { userID } = req.body

    const user = await prisma.user.findUnique({
      where: { id: userID },
      select: {
        genres: true,
        eventType: true,
        likedPosts: true,
        zipcode: true,
      },
    });

    const likedPosts = await prisma.post.findMany({
      where: { id: { in: user.likedPosts || [] }},
      select: {
        postGenre: true,
        postEventType: true,
        zipcode: true,
      },
    });

    //TODO: CHANGE TO ONLY POSTS NOT CREATED BY USER
    const posts = await prisma.post.findMany({
      include: { author: {
        select: {
          id: true,
          username: true,
          name: true,
          zipcode: true,
        },
      }},
    })

    const scoredPosts = [];

    for (const post of posts) {
      const score = await scorePost(post, user, likedPosts);
      scoredPosts.push({ ...post, score });
    }
      
    scoredPosts.sort((a, b) => {
      const compareScore = b.score - a.score
        if (compareScore !== 0) {
          return compareScore;
        }
      
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      res.json({posts: scoredPosts})

  } catch (error) {}
})


module.exports = posts;