const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getFollowing(userID) {
    const user = await prisma.user.findUnique({
        where: { id: userID },
        select: { following: true },
    })

    return (user && user.following) || [];
}

module.exports = { getFollowing }