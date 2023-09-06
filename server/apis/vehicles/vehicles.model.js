const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    yearOfProduction: {
        type: Number,
        required: true,
    },
    licensePlates: {
        type: String,
        required: true
    },
    kilometres: {
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);