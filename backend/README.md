# Carbon-Wise Backend

A production-style Node.js backend for a lifecycle vehicle comparison engine.

## Prerequisites

- Node.js (v14+)
- MongoDB (v4.4+) running on `localhost:27017`

## Setup

1.  **Install Dependencies**
    ```bash
    cd backend
    npm install
    ```

2.  **Database Setup**
    Make sure MongoDB is running locally. If you don't have it installed:
    - **macOS**: `brew tap mongodb/brew && brew install mongodb-community && brew services start mongodb-community`
    - **Other**: Check [MongoDB Installation Guide](https://www.mongodb.com/docs/manual/installation/)

3.  **Environment Variables**
    Review `.env`. Default configuration:
    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/carbon-wise
    OPENAI_API_KEY=your_key_here
    ```

## Running the Server

- **Development Mode**: `npm run dev` (requires `nodemon`)
- **Production Mode**: `node src/server.js`

## API Endpoints

### Vehicles
- `GET /api/vehicles`: List all vehicles
- `POST /api/vehicles`: Add a new vehicle

### Comparison
- `POST /api/compare`: Compare two vehicles
    ```json
    {
      "car1_id": "...",
      "car2_id": "...",
      "annual_km": 15000
    }
    ```

### AI Features
- `POST /api/ai/explain`: Get explanation for comparison
- `POST /api/ai/greenwash-check`: Check manufacturer claims

## Verification
Run the verification script to test endpoints (requires running server):
```bash
./verify_backend.sh
```
