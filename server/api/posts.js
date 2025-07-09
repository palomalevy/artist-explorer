const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const posts = express.Router()

function sortBy() {

}
// [POST] create a new post
posts.post('/createPosts', async (req, res) => {
    const { title, zipcode, caption, follow, postImages = [], musicURL, userID, postGenre } = req.body
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

posts.put('/likeStatus', async (req, res) => {

    const authorID = req.body.author.id
    const likeStatus = req.body.like

    try {
      const updatedLikeStatus = await prisma.user.update({
        where: { id: authorID },
        data: { like: likeStatus },
      });

      return res.json({ message: 'Post liked successfully!', like: updatedLikeStatus.like })

    } catch (error) {
      return res.status(500).json({error: "Failed to like post."})
    }
})

module.exports = posts;