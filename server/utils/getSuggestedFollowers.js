const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// TODO:
    // use that to display suggested on homepage
function formatSuggestions(path) {
    const suggestions = [];

    for (let userID = 1; userID < path.length; userID++){
        suggestions.push({ userID, score: path[userID] });
    }

    suggestions.sort((a, b) => a.score - b.score);

    return suggestions;
}

function getSuggestedFollowers(numUsers, edges, currentUserID) {
    // initial distance (src => vertices) === 1e8 (infinity as a placeholder since it is unknown)
    let path = new Array(numUsers + 1).fill(1e8);
    path[currentUserID] = 0;

    let lastPath = [...path];

    // relaxation of edges (numUsers) times * detect negative cycles *
    for (let sweepNum = 0; sweepNum < numUsers; sweepNum++) {
        let updated = false;

        for (const [fromUser, toUser, weight] of edges) {
            if (path[fromUser] + weight < path[toUser]) {
                path[toUser] = path[fromUser] + weight;
                updated = true;

                if (updated) {
                    lastPath = [...path];
                }

                if (sweepNum === numUsers - 1 && updated) {
                    return formatSuggestions(lastPath);
                }
            }
        }
    }

    return formatSuggestions(path);
}   

module.exports = { getSuggestedFollowers }