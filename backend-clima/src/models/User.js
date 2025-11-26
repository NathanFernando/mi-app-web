const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // No puede haber dos usuarios con el mismo nombre
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    // Campo extra para el futuro: Lista de ciudades favoritas
    favorites: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);