require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fetchCoordinates(zipcode) {
    try {
        const API_KEY = process.env.VITE_API_KEY;
        const zipcodeStr = String(zipcode);
        const country = "US";

        const res = await fetch(`https://app.zipcodebase.com/api/v1/search?apikey=${API_KEY}&codes=${zipcodeStr}&country=${country}`)
        const locationData = await res.json();

        const coordinates = locationData.results[zipcodeStr]?.[0]

        return { latitude: coordinates.latitude, longitude: coordinates.longitude };
        
    } catch (error) {}
}

module.exports = { fetchCoordinates }
