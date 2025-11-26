const mongoose = require('mongoose');

const searchLogSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        trim: true
    },
    
    username: {
        type: String,
        default: 'Invitado' // Si no hay login, se guarda como Invitado
    },
    searchDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['success', 'failed'],
        default: 'success'
    },
    temp_result: {
        type: Number,
    }
});

module.exports = mongoose.model('SearchLog', searchLogSchema);