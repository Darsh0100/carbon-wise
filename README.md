# 🌿 Carbon-Wise: The Honest Vehicle Comparison Engine

Carbon-Wise is a production-grade lifecycle analysis (LCA) tool designed to help consumers make truly sustainable vehicle choices. Unlike standard calculators, Carbon-Wise looks beyond the tailpipe to provide a comprehensive look at manufacturing, use-phase, and the environmental "truth" of different vehicles.

---

## ✨ Advanced Differentiation Features

What makes Carbon-Wise unique? We've built industry-first features that tackle the complexity of carbon accounting:

### 1. ⚖️ Dynamic Carbon Break-Even Analysis
EVs have a "carbon debt" from battery manufacturing. Carbon-Wise calculates the exact year and kilometer mark where an EV offsets its manufacturing footprint and becomes cleaner than an ICE alternative.
*   **Visual Charting**: Real-time line graphs showing the convergence of cumulative emissions.
*   **Sustainability Insight**: Automated AI-driven analysis of the crossover point.

### 2. 🛡️ Anti-Greenwashing "Truth Meter"
Manufacturer claims like "100% Carbon Neutral" are analyzed by AI to detect greenwashing risks.
*   **Risk Levels**: Low, Medium, and High risk flags.
*   **Transparency Score**: A 0-10 score based on the specificity and verifiability of the claim.
*   **AI Reasoning**: Detailed explanations of why a claim might be misleading.

### 3. 🛣️ Real-World vs. Lab Gap
Standardized tests (EPA/WLTP) often underestimate real-world driving emissions.
*   **Truth Adjustment**: A 20% "Real-World Gap" multiplier applied to use-phase emissions.
*   **Side-by-Side Visualization**: Contrast optimized lab data with honest, real-world estimates on the dashboard.

### 4. 🌍 Regional Grid Intelligence
An EV is only as clean as the power charging it.
*   **Localized Math**: Factor in regional electricity grid intensities (US, EU, China, Global).
*   **Dynamic Sensitivity**: See how moving from a "dirty" grid to a "clean" grid impacts your vehicle's lifecycle footprint.

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**: Modern, high-performance UI.
- **Tailwind CSS**: Premium, responsive styling with a focus on rich aesthetics.
- **Lucide React**: Clean, modern iconography.
- **Chart.js & Recharts**: Specialized data visualization for break-even and breakdown charts.
- **Framer Motion**: Smooth micro-animations for an interactive feel.

### Backend
- **Node.js & Express**: Scalable web server.
- **MongoDB**: Flexible database for vehicle and region data.
- **OpenAI API**: Powering the Truth Meter and comparison insights.
- **Calculation Engine**: Proprietary logic for lifecycle emissions and regional adjustments.

---

## 📁 Project Structure

```text
Carbon-Wise/
├── frontend/               # React + Tailwind Frontend
│   ├── src/components/     # Reusable UI (TruthMeter, CarbonLabel, etc.)
│   ├── src/pages/          # Dashboard and main views
│   └── src/api/            # Backend integration layer
├── backend/                # Node.js API
│   ├── src/models/         # Database schemas (Vehicle)
│   ├── src/services/       # Core Logic (Carbon & AI Services)
│   ├── src/routes/         # Controller layer
│   └── src/utils/          # Constants and math helpers
└── README.md               # You are here
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or a Cloud URI)
- OpenAI API Key

### 2. Setup Backend
```bash
cd backend
npm install
# Create .env file based on the template below
npm start
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Environment Variables (`backend/.env`)
```env
PORT=5001
MONGO_URI=your_mongodb_uri
OPENAI_API_KEY=your_openai_key
```

### 5. Seeding Test Data
To see the **Truth Meter** in action, run the seed script:
```bash
cd backend
./seed_claims.sh
```

---

## 📖 API Documentation

### Comparison Engine
- `POST /api/compare`: The heart of the engine. Returns full lifecycle comparison, break-even years, real-world gap data, and greenwashing analysis.

### Vehicle Management
- `GET /api/vehicles`: Returns all available vehicles.
- `POST /api/vehicles`: Add a new vehicle to the engine (including manufacturer claims for AI analysis).

---

## 🎨 Design Philosophy
Carbon-Wise follows a **Premium Green** aesthetic, using vibrant emerald tones, glassmorphism, and structured typography to communicate authority and clarity. Every visual element is designed to make complex carbon data easy to digest for everyday consumers.

---

*Made with ❤️ for a Greener Future.*
