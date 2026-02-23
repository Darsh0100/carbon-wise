// src/models/Vehicle.js
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    make: {
        type: String,
        required: [true, 'Please add a make'],
        trim: true,
    },
    model: {
        type: String,
        required: [true, 'Please add a model'],
        trim: true,
    },
    type: {
        type: String,
        required: [true, 'Please specify vehicle type'],
        enum: ['EV', 'ICE', 'Hybrid'],
    },
    battery_kwh: {
        type: Number,
        default: 0,
        // Required if type is EV, logic can be handled in validation or service layer if needed
    },
    consumption: {
        type: Number,
        required: [true, 'Please add consumption (kWh/100km for EV, L/100km for ICE)'],
    },
    manufacturing_emissions: {
        type: Number,
        required: [true, 'Please add base manufacturing emissions'],
    },
    manufacturer_claim: {
        type: String,
        default: null,
    },
    source: {
        type: String,
        default: 'Unknown',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
