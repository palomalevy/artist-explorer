const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const { createFeatureVector, genreMap, eventTypeMap, allowedGenres, allowedEventTypes } = require('./createFeatureVector');

function defineVectorItem(item) {
  return createFeatureVector(item, genreMap, eventTypeMap, allowedEventTypes, allowedGenres);
}

module.exports = { defineVectorItem }