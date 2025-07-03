const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const auth = express.Router()

// [POST]signup
auth.post('/signup', async (req, res) => {
    const {name, username, password, email, zipcode } = req.body
    const hash = await bcrypt.hash(password, 13)

    try {
        const existingUser = await prisma.user.findUnique({
            where: { username }
        });
        const existingEmail = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return res.send({ message: 'Username already taken!' });
        } else if (existingEmail) {
            return res.send({ message: 'Email already taken!'})
        }
        const passwordLengthValid = password.length >= 8;
        if (!passwordLengthValid) {
            return res.send({ message: 'Password must be at least 8 characters long!' });
        }
        const user = await prisma.user.create({
            data: {
            name,
            username,
            email,
            passwordHash: hash,
            zipcode,
            },
        });

        req.session.userID = user.id
        req.session.username = user.username

        res.send({ userID : user.id, message: 'user auth successful' })

        } catch (error) {
        res.send({ message: 'An error occurred during sign up.' });
        }
});

// [POST] login
auth.post('/login', async (req, res) => {
    const { identifier, password} = req.body

    try {
            var user = await prisma.user.findFirst({ 
                where: { username: identifier } 
            })
            if (user === null) {
                user = await prisma.user.findFirst({
                    where: { email: identifier }
                });
            }
            if (user === null) {
                res.send({ message: 'wrong username/email' });
                return
            } else {
                const isValid = await bcrypt.compare(password, user.passwordHash)
                if (!isValid) {
                    res.send( {message: "wrong password" } );
                    return
                }
            }

            req.session.userID = user.id
            req.session.username = user.username
        
            res.send({ userID : user.id, message: 'user auth successful' })

    } catch (error) {
        res.status(500).json({ error: "Something went wrong during login" })
    }
});

// [GET] sessions
auth.get('/me', async (req, res) => {
    if ( !req.session.userID ) {
        return res.status(401).json({message: "Not logged in."})
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: req.session.userID },
            select: { username: true }
        })

        res.json({id: req.session.userID, username: user.username})
    } catch (error) {
        res.status(500).json({error: "Error fetching user data."})
    }
})

// [POST] logout
auth.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to log out' });
    }
    res.clearCookie('connect.sid'); // Clear the session cookie
    res.json({ message: 'Logout successful' });
  });
});

module.exports = auth