const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const posts = express.Router()

// [POST] create a new post
posts.post('/createPosts', async (req, res) => {
    const { title, zipcode, caption, follow, postImages = [], musicURL, userID } = req.body
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
            },
            include: {
                author: true,
            },
        });

        res.json(postData);
    } 
    catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    }
});

posts.get('/postInfo', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true },
      orderBy: { createdAt: 'desc'},
    });
    
    res.json(posts);

  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = posts;