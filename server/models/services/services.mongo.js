const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    kilometres: {
        type: String,
        required: true
    },
    oil: {
        type: Boolean,
        required: true,
    },
    oilFilter: {
        type: Boolean,
        required: true,
    },
    fuelFilter: {
        type: Boolean,
        required: true,
    },
    airFilter: {
        type: Boolean,
        required: true,
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