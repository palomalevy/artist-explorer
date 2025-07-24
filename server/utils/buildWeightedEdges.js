const { getFollowingDistances } = require('./getFollowingDistances')
const { getFollowing } = require('./getFollowing')
const { getUserByID } = require('./getUserByID')
const { cosineSimilarity } = require('../math/cosineSimilarity')
const { defineVectorItem } = require('./defineVectorItem')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function buildWeightedEdges(user) {
    const edges = [];
    const currentUser = await getUserByID(user)

    const distance = await getFollowingDistances(currentUser.id);

    // loops through each layer of distance array from bfs
    for (let layer = 0; layer < distance.length - 1; layer++) {
        const currentLayer = distance[layer]

        // loops through each user in the current layer
        for (const fromUser of currentLayer) {
            const fromUserObject = await getUserByID(fromUser) // gets user object
            const following = await getFollowing(fromUser); // get who they are following

            const nextLayer = new Set(distance[ layer + 1 ]); // gets users in the next layer

            // for each user found in getFollowing(fromUser)
            for (const toUser of following) {

                const toUserObject = await getUserByID(toUser)

                const numPosts = toUserObject.posts.length;

                // vector creation && cosine similarity
                const createFromUserVec = defineVectorItem(fromUserObject);
                const createToUserVec = defineVectorItem(toUserObject);

                const fromUserVec = [...createFromUserVec.genreVector, ...createFromUserVec.eventTypeVector]
                const toUserVec = [...createToUserVec.genreVector, ...createToUserVec.eventTypeVector]
                
                const similarity = cosineSimilarity(fromUserVec, toUserVec);

                // assign weights
                let weight;
                if (similarity < 0.5) {
                    weight = numPosts;
                } else if (similarity >= 0.5) {
                    weight = -1 * numPosts;
                }

                // add the new set to list of edges
                edges.push([fromUser, toUser, weight])
            }
        }
    }

    return edges;
}

module.exports = { buildWeightedEdges }