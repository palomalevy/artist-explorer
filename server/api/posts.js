const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const posts = express.Router()

// TODO: [GET] enpoint for posts


// [POST] create a new post
posts.post('/createPosts', async (req, res) => {
    const { title, zipcode, caption, follow, postImages, musicURL, userID } = req.body
    try {
        const postData = await prisma.post.create({
            data: {
                title,
                zipcode,
                caption,
                postImages,
                musicURL,
                follow,
                authorId: userID,
            },
        });
        res.json(postData);
    } 
    catch (error) {
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    }
});

module.exports = posts;