const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getFollowingDistances } = require('../utils/getFollowingDistances');
const { cosineSimilarity } = require('../math/cosineSimilarity');

async function scoreSuggestedFollowers(currentUserID) {

    const distanceArray = await getFollowingDistances(currentUserID)
    const scores = new Map();

    // assign set values for scoring formula
    const a = 1;
    const r = 0.29;

    // start from distance = 2 (skip distance[0]: current user, and distance[1] users already followed)
    for (let distance = 2; distance < distanceArray.length; distance++) {
        const usersAtDistance = distanceArray[distance];
        const scoreForDistance = a * Math.pow(1 - r, distance);
        // set the new scores for each userID in the Map object
         for (const userID of usersAtDistance) {
            scores.set(userID, scoreForDistance)
         }
    }

    return scores;

}

module.exports = { scoreSuggestedFollowers }