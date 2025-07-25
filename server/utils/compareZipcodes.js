const { fetchCoordinates } = require('./fetchCoordinates')
const { haversineDistanceFormula } = require('../math/haversineDistanceFormula');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function compareZipcodes(user, post) {
    try {
        const userZipcode = user.zipcode;
        const postZipcode = post.zipcode;

        const userCoords = await fetchCoordinates(userZipcode);
        const postCoords = await fetchCoordinates(postZipcode);

        const binaryDistance = haversineDistanceFormula(userCoords, postCoords);
        
        // returns 1 if (distance < 80km) ; 0 otherwise
        return binaryDistance;

    } catch (error) {}
}

module.exports = { compareZipcodes }
