require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fetchCoordinates(zipcode) {
    try {
        const API_KEY = process.env.VITE_API_KEY;
        const zipcodeInt = parseInt(zipcode, 10);
        const country = "US";

        const res = await fetch(`https://app.zipcodebase.com/api/v1/search?apikey=${API_KEY}&codes=${zipcodeInt}&country=${country}`)
        const locationData = await res.json();

        const coordinates = locationData.results[zipcode]?.[0]

        return { latitude: coordinates.latitude, longitude: coordinates.longitude };
        
    } catch (error) {}
}

module.exports = { fetchCoordinates }
