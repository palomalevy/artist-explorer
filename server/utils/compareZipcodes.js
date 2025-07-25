const { fetchCoordinates } = require('./fetchCoordinates')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function compareZipcodes(user, post) {
    try {
        const userZipcode = user.zipcode;
        const postZipcode = post.zipcode;

        const userCoords = await fetchCoordinates(userZipcode);
        const postCoords = await fetchCoordinates(postZipcode);

        return {userCoords, postCoords};

    } catch (error) {}
}

module.exports = { compareZipcodes }
