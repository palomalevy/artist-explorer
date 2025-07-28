const { PrismaClient } = require('@prisma/client');
const { defineVectorItem } = require('./defineVectorItem');
const { cosineSimilarity } = require('../math/cosineSimilarity')
const { compareZipcodes } = require('./compareZipcodes');
const prisma = new PrismaClient();

async function scorePost(post, user, likedPosts) {
    const createPostVec = defineVectorItem(post)
    const createUserVec = defineVectorItem(user)

    const userVec = [...createUserVec.genreVector, ...createUserVec.eventTypeVector]
    const postVec = [...createPostVec.genreVector, ...createPostVec.eventTypeVector]

    // compare post -> user
    const userPrefSimilarity = cosineSimilarity(userVec, postVec)

    // compare post -> likedPost
    let likedPostSimilarity = 0;
    if ( likedPosts.length > 0 ) {
        const likedPostVectors = likedPosts.map(likedPost => {
            const createLikedPostVec = defineVectorItem(likedPost);
            return [...createLikedPostVec.genreVector, ...createLikedPostVec.eventTypeVector]
        });

        const likedPostVectorScores = likedPostVectors.map(likedPostVec => cosineSimilarity(postVec, likedPostVec))
        likedPostSimilarity = likedPostVectorScores.reduce((sum, val) => sum + val, 0) / likedPostVectorScores.length;
    }


    // assign weights
    const weightUserPrefSim = 0.3
    const weightLikedPostSim = 0.6

    // calc final score
    const finalPostScore = (weightUserPrefSim * userPrefSimilarity) + (weightLikedPostSim * likedPostSimilarity)
    
    return finalPostScore
}

module.exports = { scorePost }