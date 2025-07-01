const express = require('express')
const cors = require('cors')
const User = require('./boards-prisma')
const Post = require('./cards-prisma')

server.use(express.json())
server.use(cors())

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();