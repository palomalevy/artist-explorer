const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getFollowing(userID) {
    const user = await prisma.user.findUnique({
        where: { id: userID },
        select: { following: true },
    })

    if (user != null && user.following != null) {
        return user.following;
    } else {
        return []
    }
}

module.exports = { getFollowing }