const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getFollowingDistances } = require('../utils/getFollowingDistances');
const { getUserByID } = require('../utils/getUserByID')
const { cosineSimilarity } = require('../math/cosineSimilarity');
const { defineVectorItem } = require('../utils/defineVectorItem')

async function scoreSuggestedFollowers(userID) {
    
    const currentUser = await getUserByID(userID);
    const distanceArray = await getFollowingDistances(currentUser.id)
    
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

            const suggestedUser = await getUserByID(userID);

            // creates vectors using the user objects
            const createCurrentUserVec = defineVectorItem(currentUser)
            const createSuggestedUserVec = defineVectorItem(suggestedUser)

            // combines genre and event type vectors into single vector for current and suggested user
            const currentUserVec = [...createCurrentUserVec.genreVector, ...createCurrentUserVec.eventTypeVector]
            const suggestedUserVec = [...createSuggestedUserVec.genreVector, ...createSuggestedUserVec.eventTypeVector]

            const userVectorSimilarity = cosineSimilarity(currentUserVec, suggestedUserVec)
            
            // assigns weights for distance and pref similarity
            const distanceWeight = 0.7;
            const similarityWeight = 0.3;
            const finalSuggestedUserScore = ( distanceWeight * scoreForDistance ) + ( similarityWeight * userVectorSimilarity )
            
            scores.set(userID, finalSuggestedUserScore);
         }
    }
    const finalScoresObject = Object.fromEntries(scores);
    return finalScoresObject;
}

module.exports = { scoreSuggestedFollowers }