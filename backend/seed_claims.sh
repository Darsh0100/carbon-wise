#!/bin/bash

BASE_URL="http://localhost:5001/api"

echo "Seeding vehicles with claims..."

# Vehicle with 'Low Risk' claim
curl -s -X POST "$BASE_URL/vehicles" \
  -H "Content-Type: application/json" \
  -d '{
    "make": "Polestar",
    "model": "2",
    "type": "EV",
    "consumption": 17,
    "battery_kwh": 78,
    "manufacturing_emissions": 7000,
    "manufacturer_claim": "Completely transparent LCA report published online for every model.",
    "source": "WLTP"
  }'

# Vehicle with 'Medium/High Risk' claim
curl -s -X POST "$BASE_URL/vehicles" \
  -H "Content-Type: application/json" \
  -d '{
    "make": "EcoCar",
    "model": "Green-NX",
    "type": "EV",
    "consumption": 14,
    "battery_kwh": 50,
    "manufacturing_emissions": 9000,
    "manufacturer_claim": "The worlds first 100% emission-free vehicle from cradle to grave.",
    "source": "Manufacturer"
  }'

echo -e "\nSeed complete. Compare Polestar 2 and EcoCar Green-NX to see the Truth Meter."
