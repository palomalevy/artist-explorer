const { getFollowing } = require('./getFollowing')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* Function Description:
Takes a userID and finds connected users by distance with BFS
@param {string} currentUserID - the starting user we want to find all connected users from
@return {string[i][j]} 2d array of connected userIDs where the 'i' is the distance from the initial user
*/

async function getFollowingDistances(currentUserID) {

    // queue of users to check at current level
    let usersToCheck = [currentUserID];

    // to begin, only includes the starting/current user
    const distance = [[currentUserID]];

    // array of users that have already been checked, begins empty.
    const checkedUsers = new Set();

    while ( usersToCheck.length ) {
        const newQueue = [];

        for (const userID of usersToCheck) {
            const followingArray = await getFollowing(userID)

            for (const followingID of followingArray) {
                if (!checkedUsers.has(followingID)) {
                    checkedUsers.add(followingID);
                    newQueue.push(followingID);
                }
            }
        }

        if (newQueue.length === 0) break;

        distance.push(newQueue);
        usersToCheck = newQueue;
    }
    return distance;
}

module.exports = { getFollowingDistances };