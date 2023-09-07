const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    contractor: {
        type: String,
        required: true
    },
    contractorContact: {
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

module.exports = mongoose.model('Maintenance', maintenanceSchema);