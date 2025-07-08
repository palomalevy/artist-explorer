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
  
  console.log('This is the req.body for genres: ', req.body);
  const userID = req.session.userID;
  const genres = req.body.genres;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userID },
      data: { genres },
    });

    console.log('Updated user genres: ', updatedUser.genres)
    return res.json({ message: 'Genres updated.', genres: updatedUser.genres });
  
  } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Failed to update genres.' });
  }
});

users.put('/eventType', async (req, res) => {

  console.log('This is the req.body for event: ', req.body)
  const userID = req.session.userID;
  const eventType = req.body.eventType;

  try {
    const updatedUserEvents = await prisma.user.update({
      where: { id: userID },
      data: { eventType },
    });

    console.log('Updated user events: ', updatedUserEvents.eventType)
    return res.json({ message: 'Preferred events updated.', eventType: updatedUserEvents.eventType })

  } catch (error) {
    console.error(error)
    return res.status(500).json({error: 'Fauled to update preferred events.'})
  }
});

users.put('/zipcode', async (req, res) => {

  console.log('This is the req.body for event: ', req.body)
  const userID = req.session.userID;
  const zipcode = parseInt(req.body.zipcode);

  try {
    const updatedZipcode = await prisma.user.update({
      where: { id: userID },
      data: { zipcode },
    });

    console.log('Updated zipcode: ', updatedZipcode.zipcode)
    return res.json({ message: 'Zipcode updated.', zipcode: updatedZipcode.zipcode })

  } catch (error) {
    console.error(error)
    return res.status(500).json({error: 'Fauled to update zipcode.'})
  }
});

module.exports = users;
