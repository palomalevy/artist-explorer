const cookieParser = require("cookie-parser");
const bcrypt = require('bcryptjs');
const express = require('express');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const auth = express.Router()
const users = [

]
// auth.use(helmet())

// allows users to signup
auth.post('/signup', async (req, res) => {
    const {name, username, password, email, zipcode, genres} = req.body
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
        await prisma.user.create({
            data: {
            name,
            username,
            email,
            passwordHash: hash,
            zipcode,
            },
        });
        res.send({ message: 'Sign up successful!' });
        } catch (error) {
        res.send({ message: 'An error occurred during sign up.' });
        }
})
// allows users to login
auth.post('/login', async (req, res) => {
    const { identifier, password} = req.body
    console.log('this is req.body: ', req.body)
    var user = await prisma.user.findFirst({ 
        where: { username: identifier } 
    })
    if (user === null) {
        console.log('User not found by username, checking email...')
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
        console.log('passed pwd check')
    }


    // TODO: send a cookie here
 
    res.send({ message: 'user auth successful' })
})

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
        console.error(error)
        res.status(500).json({error: "Error fetching user data."})
    }
})

// TODO: logout endpoint

module.exports = auth