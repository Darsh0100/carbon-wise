// src/routes/compareRoutes.js
const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const recommendationService = require('../services/recommendationService');

// @desc    Compare two vehicles
// @route   POST /api/compare
router.post('/', async (req, res) => {
    const { car1_id, car2_id, annual_km, region } = req.body;

    if (!car1_id || !car2_id || !annual_km) {
        return res.status(400).json({ message: 'Please provide car1_id, car2_id, and annual_km' });
    }

    try {
        const car1 = await Vehicle.findById(car1_id);
        const car2 = await Vehicle.findById(car2_id);

        if (!car1 || !car2) {
            return res.status(404).json({ message: 'One or both vehicles not found' });
        }

        const comparison = await recommendationService.compareVehicles(car1, car2, annual_km, region);
        res.json(comparison);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
