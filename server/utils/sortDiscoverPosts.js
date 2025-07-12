const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

function scorePost(post, user) {
    const preferredGenres = user.genres
    const preferredEvents = user.eventType

    const postGenre = post.postGenre
    const postEventType = post.postEventType

    let score = 0;

    if (preferredGenres.includes(postGenre)) {
        score += 10
    }

    if (preferredEvents.includes(postEventType)) {
        score += 7
    }

    return score;
}

module.exports = { scorePost }