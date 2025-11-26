// src/models/SearchLog.js
const mongoose = require('mongoose');

// Este esquema cumple con el punto "Registrar consultas meteorológicas"
const searchLogSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        trim: true
    },
    searchDate: {
        type: Date,
        default: Date.now // Se guarda la fecha automática
    },
    status: {
        type: String,
        enum: ['success', 'failed'], // Solo permite estos dos valores
        default: 'success'
    },
    temp_result: {
        type: Number, // Guardamos qué temperatura devolvió (opcional, para estadísticas)
    }
});

module.exports = mongoose.model('SearchLog', searchLogSchema);