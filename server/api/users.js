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

module.exports = users;
