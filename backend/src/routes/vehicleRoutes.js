// src/routes/vehicleRoutes.js
const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

// @desc    Get all vehicles
// @route   GET /api/vehicles
router.get('/', async (req, res) => {
    try {
        const vehicles = await Vehicle.find({});
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Add a vehicle (for testing/seeding)
// @route   POST /api/vehicles
router.post('/', async (req, res) => {
    try {
        const vehicle = new Vehicle(req.body);
        const savedVehicle = await vehicle.save();
        res.status(201).json(savedVehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
