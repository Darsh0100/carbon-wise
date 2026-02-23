// src/routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

// @desc    Get AI explanation for comparison result
// @route   POST /api/ai/explain
router.post('/explain', async (req, res) => {
    const { comparison_result } = req.body;

    if (!comparison_result) {
        return res.status(400).json({ message: 'Please provide comparison_result' });
    }

    try {
        const explanation = await aiService.generateExplanation(comparison_result);
        res.json({ explanation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Check manufacturer claim for greenwashing
// @route   POST /api/ai/greenwash-check
router.post('/greenwash-check', async (req, res) => {
    const { claim } = req.body;

    if (!claim) {
        return res.status(400).json({ message: 'Please provide a claim to analyze' });
    }

    try {
        const analysis = await aiService.detectGreenwashing(claim);
        res.json(analysis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
