// src/services/aiService.js
const OpenAI = require('openai');
const CONSTANTS = require('../utils/constants');

class AIService {
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    /**
     * Generate explanation for vehicle comparison
     * @param {Object} comparisonResult 
     * @returns {string} explanation
     */
    async generateExplanation(comparisonResult) {
        try {
            const prompt = `
        Analyze this vehicle comparison:
        Car 1 (${comparisonResult.car1.vehicle.make} ${comparisonResult.car1.vehicle.model}): Total Life Cycle Emissions ${Math.round(comparisonResult.car1.total)} kg CO2.
        Car 2 (${comparisonResult.car2.vehicle.make} ${comparisonResult.car2.vehicle.model}): Total Life Cycle Emissions ${Math.round(comparisonResult.car2.total)} kg CO2.
        
        Recommended: ${comparisonResult.recommended.make} ${comparisonResult.recommended.model} (Saves ${Math.round(comparisonResult.recommended.savings_kg)} kg CO2).
        Breakeven years (if applicable): ${comparisonResult.breakeven_years ? comparisonResult.breakeven_years.toFixed(1) : 'N/A'}.

        Provide a detailed explanation (approx. 4-5 sentences) covering:
        1) The primary reason for the recommendation (e.g., lower total emissions).
        2) A comparison of manufacturing vs. use-phase emissions (e.g., "While the EV has higher manufacturing emissions due to the battery...").
        3) The long-term impact and breakeven point.
        Make it persuasive and educational for a consumer.
      `;

            const response = await this.openai.chat.completions.create({
                model: CONSTANTS.AI_MODEL || 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 150,
            });

            return response.choices[0].message.content.trim();
        } catch (error) {
            console.error("AI Service Error:", error.message);
            return `(Mock Explanation) The ${comparisonResult.recommended.make} ${comparisonResult.recommended.model} is the better choice, saving ${Math.round(comparisonResult.recommended.savings_kg).toLocaleString()} kg of CO2. While it may have higher manufacturing emissions, its efficiency on the road allows it to break even in just ${comparisonResult.breakeven_years ? comparisonResult.breakeven_years.toFixed(1) : 'a few'} years. This makes it a significantly cleaner option for long-term ownership.`;
        }
    }

    /**
     * Detect greenwashing in manufacturer claims
     * @param {string} claim 
     * @returns {Object} analysis
     */
    async detectGreenwashing(claim) {
        try {
            const prompt = `
        Analyze the following manufacturer claim for potential "greenwashing" (misleading environmental claims).
        Claim: "${claim}"

        Return a JSON object with:
        - risk_level: "low", "medium", or "high"
        - reason: A short explanation of the risk.
        - transparency_score: 0-10 integer score.

        JSON only.
      `;

            const response = await this.openai.chat.completions.create({
                model: CONSTANTS.AI_MODEL || 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 150,
            });

            const content = response.choices[0].message.content.trim();
            // Simple parsing attempt, robust solution would use JSON mode or stricter parsing
            try {
                return JSON.parse(content);
            } catch (e) {
                // Fallback if AI returns text
                return {
                    risk_level: "unknown",
                    reason: content,
                    transparency_score: 0
                };
            }
        } catch (error) {
            console.error("AI Service Error:", error.message);
            return {
                risk_level: "low",
                reason: "(Mock Analysis) Claim appears specific and plausible. (Real AI unavailable)",
                transparency_score: 8
            };
        }
    }
}

module.exports = new AIService();
