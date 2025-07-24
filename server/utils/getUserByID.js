const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getUserByID(userID) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userID,
            },
            select: {
                following: true,
                id: true,
                genres: true,
                eventType: true,
                posts: {
                    select: { id: true }
                }
            }
        })
        return user;
    } catch (error) {}
}

module.exports = { getUserByID }