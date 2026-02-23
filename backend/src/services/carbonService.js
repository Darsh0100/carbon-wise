// src/services/carbonService.js
const CONSTANTS = require('../utils/constants');

class CarbonService {
    /**
     * Calculate manufacturing emissions
     * @param {Object} vehicle - Vehicle object
     * @returns {number} - Total manufacturing emissions (kg CO2)
     */
    calculateManufacturingEmissions(vehicle) {
        let manufacturing = vehicle.manufacturing_emissions || 0;

        if (vehicle.type === 'EV' && vehicle.battery_kwh) {
            manufacturing += vehicle.battery_kwh * CONSTANTS.BATTERY_MANUFACTURING_CI;
        }

        return manufacturing;
    }

    /**
     * Calculate use-phase emissions per km
     * @param {Object} vehicle - Vehicle object
     * @param {string} region - Region code for grid intensity (default: 'DEFAULT')
     * @returns {number} - Emissions per km (kg CO2/km)
     */
    calculateUsePerKm(vehicle, region = 'DEFAULT') {
        let usePerKm = 0;

        if (vehicle.type === 'ICE') {
            // consumption is L/100km
            usePerKm = (vehicle.consumption / 100) * CONSTANTS.FUEL_CI;
        } else if (vehicle.type === 'EV') {
            // consumption is kWh/100km (standardize if needed, usually kWh/100km or Wh/km)
            // Assuming consumption is kWh/100km based on user prompt formulas "consumption * grid_CI" 
            // where usually it's (consumption/100)*grid_CI. 
            // USER PROMPT FORMULA: use_per_km = consumption × grid_CI. 
            // If consumption is kWh/km, then correct. If kWh/100km, need /100.
            // Let's assume input is normalized or follow formula strictly.
            // Formula says "consumption * grid_CI". 
            // If typical EV is 15 kWh/100km = 0.15 kWh/km.
            // If formula implies consumption is kWh/km:
            // We will assume the stored 'consumption' for EV is kWh/km for the formula to hold directly, 
            // OR we interpret "consumption" in "consumption * grid_CI" as energy consumed per unit distance.
            // Let's follow the User's formula literally: use_per_km = consumption * grid_CI.
            // This implies consumption unit in DB should correspond to "Energy per km".

            const gridCI = CONSTANTS.GRID_CI[region] || CONSTANTS.GRID_CI.DEFAULT;
            usePerKm = (vehicle.consumption / 100) * gridCI;
        }

        return usePerKm;
    }

    /**
     * Calculate total lifecycle emissions with breakdown
     * @param {Object} vehicle - Vehicle object
     * @param {number} annualKm - Annual driving distance in km
     * @param {number} lifetimeYears - Vehicle lifetime in years
     * @param {string} region - Region for grid intensity
     * @returns {Object} - Emission breakdown
     */
    calculateTotalEmissions(vehicle, annualKm, lifetimeYears = CONSTANTS.LIFETIME_YEARS, region = 'DEFAULT') {
        const lifetimeDistance = annualKm * lifetimeYears;

        const manufacturing = this.calculateManufacturingEmissions(vehicle);
        const usePerKm = this.calculateUsePerKm(vehicle, region);
        const usePhase = usePerKm * lifetimeDistance;
        const endOfLife = 0; // standard payload requirement

        const total = manufacturing + usePhase - endOfLife;
        const perKm = total / lifetimeDistance;

        return {
            manufacturing,
            use_phase: usePhase,
            end_of_life: endOfLife,
            total,
            per_km: perKm
        };
    }

    /**
     * Calculate breakeven years between EV and ICE
     * @param {Object} iceVehicle 
     * @param {Object} evVehicle 
     * @param {number} annualKm 
     * @param {string} region
     * @returns {number} - Years to breakeven
     */
    calculateBreakeven(iceVehicle, evVehicle, annualKm, region = 'DEFAULT') {
        const manufIce = this.calculateManufacturingEmissions(iceVehicle);
        const manufEv = this.calculateManufacturingEmissions(evVehicle);

        const useIcePerKm = this.calculateUsePerKm(iceVehicle, region);
        const useEvPerKm = this.calculateUsePerKm(evVehicle, region);

        const annualUseIce = useIcePerKm * annualKm;
        const annualUseEv = useEvPerKm * annualKm;

        // (Manuf_EV - Manuf_ICE) / (Annual_ICE - Annual_EV)
        const numerator = manufEv - manufIce;
        const denominator = annualUseIce - annualUseEv;

        if (denominator <= 0) return -1; // Never breakeven or EV is worse in use phase (unlikely with clean grid)

        return numerator / denominator;
    }

    /**
     * Get cumulative emissions over time for a vehicle
     * @param {Object} vehicle 
     * @param {number} annualKm 
     * @param {number} maxYears 
     * @param {string} region 
     * @returns {Array} - Array of cumulative emissions per year
     */
    getComparisonTimeline(vehicle, annualKm, maxYears = 15, region = 'DEFAULT') {
        const manufacturing = this.calculateManufacturingEmissions(vehicle);
        const usePerKm = this.calculateUsePerKm(vehicle, region);
        const annualUse = usePerKm * annualKm;

        const timeline = [];
        for (let year = 0; year <= maxYears; year++) {
            timeline.push({
                year,
                emissions: manufacturing + (annualUse * year)
            });
        }
        return timeline;
    }

    /**
     * Calculate emissions adjusted for real-world conditions
     * @param {Object} breakdown - Standard emission breakdown
     * @returns {Object} - Adjusted breakdown
     */
    calculateRealWorldEmissions(breakdown) {
        return {
            ...breakdown,
            use_phase: breakdown.use_phase * CONSTANTS.REAL_WORLD_FACTOR,
            total: breakdown.manufacturing + (breakdown.use_phase * CONSTANTS.REAL_WORLD_FACTOR),
            is_real_world: true
        };
    }
}

module.exports = new CarbonService();
