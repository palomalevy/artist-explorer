const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const allowedGenres = [
        "POP", 
        "CLASSICAL", 
        "LATIN", 
        "HOUSE", 
        "COUNTRY",
        "HIPHOP", 
        "JAZZ", 
        "ROCK", 
        "DISCO", 
        "EDM", 
        "BLUES", 
        "LOFI"
    ];

const allowedEventTypes = [
        "CONCERT", 
        "FESTIVAL", 
        "NIGHTCLUB", 
        "SPEAKEASY", 
        "BAND",
        "STUDIO", 
        "AWARDS", 
        "CLASSES", 
        "THEATER"
];

const genreMap = allowedGenres.reduce((map, genre, index) => {
    map[genre] = index;
    return map;
}, {});

const eventTypeMap = allowedEventTypes.reduce((map, eventType, index) => {
    map[eventType] = index;
    return map;
}, {});

function createFeatureVector(item, genreMap, eventTypeMap, allowedEventTypes, allowedGenres) {
    try {
        const genreVector = new Array(allowedGenres.length).fill(0);
        const eventTypeVector = new Array(allowedEventTypes.length).fill(0);

        if (Array.isArray(item.genres)) {
            for (const genre of item.genres) {
                const index = genreMap[genre];
                if (index !== undefined) genreVector[index] = 1;
            }
        } else if (typeof item.postGenre === 'string') {
            const index = genreMap[item.postGenre];
            if (index !== undefined) genreVector[index] = 1;
        }
        
        if (Array.isArray(item.eventType)) {
            for (const eventType of item.eventType) {
                const index = eventTypeMap[eventType];
                if (index !== undefined) eventTypeVector[index] = 1;
            }
        } else if (typeof item.postEventType === 'string') {
                const index = eventTypeMap[item.postEventType];
                if (index !== undefined) eventTypeVector[index] = 1;
        }

        return { genreVector, eventTypeVector };
    } catch (error) {}
    
}

module.exports = { createFeatureVector, allowedGenres, allowedEventTypes, genreMap, eventTypeMap };