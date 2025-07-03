const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient();
const posts = express.Router()

// TODO: [GET] enpoint for posts


posts.post('/posts', async (req, res) => {
    const { title, zipcode, postImages, musicURL, userID } = req.body
    try {
        const result = await prisma.post.create({
            data: {
                title,
                zipcode,
                postImages,
                musicURL,
                authorId: userID,
            },
        });
        res.json(result);
    } 
    catch (error) {
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    }
});

module.exports = posts;