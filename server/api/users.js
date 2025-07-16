const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const users = express.Router()


users.post('/userInfo', async (req, res, next) => {
  try {
    const { userID } = req.body

    const userData = await prisma.user.findUnique({
      where: { id: userID },
      include: { posts: true },
    });

    res.json(userData)

  } catch (error) {
    res.status(500).json({ error: 'Internal service error' })
  }
})

users.put('/genres', async (req, res) => {
  
  const userID = req.session.userID;
  const genres = req.body.genres;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userID },
      data: { genres },
    });

    return res.json({ message: 'Genres updated.', genres: updatedUser.genres });
  
  } catch (error) {
      return res.status(500).json({ error: 'Failed to update genres.' });
  }
});

users.put('/eventType', async (req, res) => {

  const userID = req.session.userID;
  const eventType = req.body.eventType;

  try {
    const updatedUserEvents = await prisma.user.update({
      where: { id: userID },
      data: { eventType },
    });

    return res.json({ message: 'Preferred events updated.', eventType: updatedUserEvents.eventType })

  } catch (error) {
    return res.status(500).json({error: 'Fauled to update preferred events.'})
  }
});

users.put('/zipcode', async (req, res) => {

  const userID = req.session.userID;
  const zipcode = parseInt(req.body.zipcode);

  try {
    const updatedZipcode = await prisma.user.update({
      where: { id: userID },
      data: { zipcode },
    });

    return res.json({ message: 'Zipcode updated.', zipcode: updatedZipcode.zipcode })

  } catch (error) {
    return res.status(500).json({error: 'Fauled to update zipcode.'})
  }
});

users.put('/likedPosts', async (req, res) => {

    const userID = req.session.userID
    const likeStatus = req.body.updatedLikedPosts

    try {
      const updatedLikeStatus = await prisma.user.update({
        where: { id: userID },
        data: { likedPosts: likeStatus},
      });

      return res.json({ message: 'Post liked successfully!', likedPosts: updatedLikeStatus.likedPosts })

    } catch (error) {
      return res.status(500).json({error: "Failed to like post."})
    }
})

users.put('/following', async (req, res) => {

    const userID = req.session.userID
    const followingStatus = req.body.updatedFollowing

    try {
      const updatedFollowing = await prisma.user.update({
        where: { id: userID },
        data: { following: followingStatus },
      });

      return res.json({ message: 'Post liked successfully!', following: updatedFollowing.following })

    } catch (error) {
      return res.status(500).json({error: "Failed to follow."})
    }
})


module.exports = users;