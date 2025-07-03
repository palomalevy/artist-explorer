const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient();
const users = express.Router()


users.get('/me/:userID', async (req, res, next) => {
  try {
    const userID = parseInt(req.params.userID);

    const userData = await prisma.user.findUnique({
      where: { id: userID }
    });
    res.json(userData)
  } catch (error) {
    res.status(500).json({ error: 'Internal service error' })
  }
})

module.exports = users;