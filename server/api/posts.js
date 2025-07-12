const express = require('express');
const bcrypt = require('bcryptjs');
const { scorePost } = require('../utils/sortDiscoverPosts')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const posts = express.Router()

// [POST] create a new post
posts.post('/createPosts', async (req, res) => {
    const { title, zipcode, caption, follow, postImages = [], musicURL, userID, postGenre, postEventType } = req.body
    try {
        const postData = await prisma.post.create({
            data: {
                title,
                zipcode,
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
    
    res.json(posts);

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

posts.post('/discoverPosts', async (req, res) => {
  const userID = req.body.userID;

  try {
      const user = await prisma.user.findUnique({
        where: { id: userID },
        select: {
          genres: true,
          eventType: true,
          createdAt: true,
        }
      });

      const posts = await prisma.post.findMany({
        include: { author: true },
      })

      const scoredPosts = posts.map(post => ({
        ...post,
        score: scorePost(post, user),
      }));

      scoredPosts.sort((a, b) => {
        const compareScore = b.score - a.score
            if (compareScore !== 0) {
              return compareScore;
            }

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      res.json(scoredPosts)

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
  
});

module.exports = posts;