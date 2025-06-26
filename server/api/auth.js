const cookieParser = require("cookie-parser");
const bcrypt = require('bcryptjs');
const express = require('express');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// const User = require('./users-prisma')
// const Post = require('./posts-prisma')
// const helmet = require('helmet')

const auth = express.Router()
const users = [

]
// auth.use(helmet())

// allows users to signup
auth.post('/signup', async (req, res) => {
    const {name, username, password, email, zipcode, genres} = req.body
    const hash = await bcrypt.hash(password, 13)

    try {
        await prisma.user.create({data: {
            name,
            username,
            email,
            passwordHash: hash,
            zipcode
        }})

        res.send('sign up successful')
    } catch (error) {
        console.log(error)
        res.send('Username/Email taken.')
    }
    
})
// allows users to login
auth.post('/login', async (req, res) => {
    const { username, password} = req.body
    const user = await prisma.user.findFirst({ 
        where: {username} 
    })
    if (!user) {
        res.send("wrong username")
        return
    }
    const isValid = await bcrypt.compare(password, user.passwordHash)
    if (!isValid) {
        res.send("wrong password")
        return
    }

    // send a cookie
    res.send('user auth successful')
})

module.exports = auth
// auth.listen(3000, () => console.log('listening on port 3000'))