// src/utils/constants.js

const CONSTANTS = {
  // Manufacturing Emissions
  BATTERY_MANUFACTURING_CI: 60, // kg CO2 per kWh (battery production)

  // Use Phase Emissions
  FUEL_CI: 2.3, // kg CO2 per liter (gasoline)

  // Grid Carbon Intensity by Region (kg CO2 per kWh)
  GRID_CI: {
    US: 0.38,      // Average US grid intensity
    EU: 0.25,      // Average EU grid intensity
    CHINA: 0.53,   // Average China grid intensity
    GLOBAL: 0.475, // Global average
    DEFAULT: 0.5   // Default fallback
  },

  // Lifecycle Standards
  LIFETIME_YEARS: 10,
  LIFETIME_DISTANCE_KM: 150000, // standard assumption if not provided

  // AI Configuration
  AI_MODEL: "gpt-4o-mini", // Cost-effective, high-quality model

  // Real-world vs Lab adjustment
  REAL_WORLD_FACTOR: 1.20, // 20% increase for real-world conditions
};

module.exports = CONSTANTS;
