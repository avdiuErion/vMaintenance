const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    kilometres: {
        type: String,
        required: true,
        default: null
    },
    oil: {
        type: Boolean,
        required: true,
        default: false
    },
    oilFilter: {
        type: Boolean,
        required: true,
        default: false
    },
    fuelFilter: {
        type: Boolean,
        required: true,
        default: false
    },
    airFilter: {
        type: Boolean,
        required: true,
        default: false
    },
    notes: {
        type: String,
    },
    vehicleId:{
        type: mongoose.Schema.ObjectId,
        ref: 'Vehicle',
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

module.exports = mongoose.model('Service', serviceSchema);