const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getUsersByIDs(userIDs) {

    // gets user object by id for a batch of users instead of a single user.
    if (userIDs.length === 0) {
        return [];
    }

    const users = await prisma.user.findMany({
        where: {
            id: { in: userIDs }
        },
        select: {
            id: true,
            username: true,
            name: true,
        }
    });

    return users;
}

module.exports = { getUsersByIDs }