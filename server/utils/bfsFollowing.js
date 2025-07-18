const { getFollowing } = require('../utils/getFollowing')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function bfsFollowing(currentUserID) {

    // queue of users to check at current level
    let usersToCheck = [currentUserID];

    // to begin, only includes the starting/current user
    const distance = [[currentUserID]];

    // array of users that have already been checked, beginning with the starting user.
    const checkedUsers = new Set([currentUserID]);

    while ( usersToCheck.length ) {
        const newQueue = [];

        for (const userID of usersToCheck) {
            const followingArray = await getFollowing(userID)

            for (const followingID of followingArray) {
                if (!checkedUsers.has(followingID)) {
                    checkedUsers.add(followingID);
                    newQueue.push(followingID);
                };
            };
        };

        if (newQueue.length === 0) break;

        distance.push(newQueue);
        usersToCheck = newQueue;
    };
    return distance;
};

module.exports = { bfsFollowing };