// src/models/WeatherCache.js
const mongoose = require('mongoose');

const weatherCacheSchema = new mongoose.Schema({
    city_lower: {
        type: String,
        required: true,
        unique: true, // No queremos duplicados de la misma ciudad
        lowercase: true // Para que "Londres" y "londres" sean lo mismo
    },
    data: {
        type: Object, // Aquí guardaremos todo el JSON que nos da OpenWeather
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600 //  Esto borra el documento automáticamente después de 600 segundos (10 minutos)
    }
});

module.exports = mongoose.model('WeatherCache', weatherCacheSchema);