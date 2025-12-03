const mongoose = require('mongoose');
//Esquema de usuario
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
    // Lista de ciudades favoritas
    favorites: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);