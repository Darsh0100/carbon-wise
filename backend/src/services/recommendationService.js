// src/services/recommendationService.js
const carbonService = require('./carbonService');
const aiService = require('./aiService');
const CONSTANTS = require('../utils/constants');

class RecommendationService {
    /**
     * Compute confidence score (0-100) based on data quality
     * @param {Object} vehicle 
     * @returns {number} score
     */
    computeConfidenceScore(vehicle) {
        let score = 0;

        // Source reliability
        if (['EPA', 'WLTP'].includes(vehicle.source)) {
            score += 40;
        } else {
            score += 10; // Base points for unknown source
        }

        // Manufacturer claim penalty
        if (vehicle.manufacturer_claim) {
            score -= 10;
        }

        // Data completeness
        if (vehicle.type === 'EV' && !vehicle.battery_kwh) {
            score -= 20;
        }

        if (!vehicle.consumption) {
            score -= 20;
        }

        // Ensure score is within 0-100
        return Math.max(0, Math.min(100, score));
    }

    /**
     * Compare two vehicles and recommend the lower emission one
     * @param {Object} car1 
     * @param {Object} car2 
     * @param {number} annualKm 
     * @param {string} region
     * @returns {Object} comparison result
     */
    async compareVehicles(car1, car2, annualKm, region = 'DEFAULT') {
        const emissions1 = carbonService.calculateTotalEmissions(car1, annualKm, undefined, region);
        const emissions2 = carbonService.calculateTotalEmissions(car2, annualKm, undefined, region);

        // Calculate Real World variants
        const realWorld1 = carbonService.calculateRealWorldEmissions(emissions1);
        const realWorld2 = carbonService.calculateRealWorldEmissions(emissions2);

        // Perform Greenwashing Detection if claims exist
        let greenwashing1 = null;
        let greenwashing2 = null;

        if (car1.manufacturer_claim) {
            greenwashing1 = await aiService.detectGreenwashing(car1.manufacturer_claim);
        }
        if (car2.manufacturer_claim) {
            greenwashing2 = await aiService.detectGreenwashing(car2.manufacturer_claim);
        }

        // Supplement with confidence scores
        const result1 = {
            ...emissions1,
            real_world: realWorld1,
            greenwashing: greenwashing1,
            confidence_score: this.computeConfidenceScore(car1),
            vehicle: car1,
            timeline: carbonService.getComparisonTimeline(car1, annualKm, 15, region)
        };

        const result2 = {
            ...emissions2,
            real_world: realWorld2,
            greenwashing: greenwashing2,
            confidence_score: this.computeConfidenceScore(car2),
            vehicle: car2,
            timeline: carbonService.getComparisonTimeline(car2, annualKm, 15, region)
        };

        let breakeven = null;
        // Calculate breakeven if one is EV and other ICE
        if ((car1.type === 'EV' && car2.type === 'ICE') || (car1.type === 'ICE' && car2.type === 'EV')) {
            const ice = car1.type === 'ICE' ? car1 : car2;
            const ev = car1.type === 'EV' ? car1 : car2;
            breakeven = carbonService.calculateBreakeven(ice, ev, annualKm, region);
        }

        const recommended = result1.total < result2.total ? car1 : car2;
        const savings = Math.abs(result1.total - result2.total);

        return {
            car1: result1,
            car2: result2,
            breakeven_years: breakeven,
            recommended: {
                id: recommended._id,
                make: recommended.make,
                model: recommended.model,
                savings_kg: savings
            }
        };
    }
}

module.exports = new RecommendationService();
