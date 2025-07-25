const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

function haversineDistanceFormula(userCoords, postCoords, limitKm = 80) {
    function toRad(degree) {
        return degree * (Math.PI / 180);
    }

    const R = 6371;

    // find difference between the coordinates of both inputs (in radians)
    const dLat = toRad(userCoords.latitude - postCoords.latitude)
    const dLon = toRad(userCoords.longitude - postCoords.longitude)

    const { sin, cos, sqrt, atan2 } = Math;

    const a = 
        sin(dLat / 2) * sin(dLat / 2) +
        cos(toRad(userCoords.latitude)) * cos(toRad(postCoords.latitude)) *
        sin(dLon / 2) * sin(dLon / 2);

    const c = 2 * atan2(sqrt(a), sqrt(1 - a));

    const binaryDistance = R * c;

    // returns binary value depending on distance (km)
    return binaryDistance <= limitKm ? 1 : 0;
}

module.exports = { haversineDistanceFormula }
