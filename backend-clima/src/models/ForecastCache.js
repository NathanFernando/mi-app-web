// src/models/ForecastCache.js
const mongoose = require('mongoose');

const forecastCacheSchema = new mongoose.Schema({
    city_lower: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    data: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 10800 // El pronóstico expira en 3 horas (10800 seg) porque cambia menos
    }
});

module.exports = mongoose.model('ForecastCache', forecastCacheSchema);