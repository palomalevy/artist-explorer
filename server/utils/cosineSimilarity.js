const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

function cosineSimilarity(postVec, vecB) {
    try {
        let dotProduct = 0;
        let magPostVec = 0;
        let magB = 0;

        for (let index = 0; index < postVec.length; index++) {
            dotProduct += postVec[index] * vecB[index];
            magPostVec += postVec[index] * postVec[index];
            magB += vecB[index] * vecB[index];
        }

        if (magPostVec === 0 || magB === 0) {
            return 0;
        }

        return (dotProduct / (Math.sqrt(magPostVec) * Math.sqrt(magB)))

    } catch (error) {}
}

module.exports = {cosineSimilarity}