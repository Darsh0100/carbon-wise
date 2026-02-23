#!/bin/bash

BASE_URL="http://localhost:5001/api"

echo "1. Testing GET /api/vehicles..."
curl -s "$BASE_URL/vehicles"
echo -e "\n"

echo "2. Adding an ICE vehicle..."
ICE_ID=$(curl -s -X POST "$BASE_URL/vehicles" \
  -H "Content-Type: application/json" \
  -d '{
    "make": "Toyota",
    "model": "Camry",
    "type": "ICE",
    "consumption": 7.5,
    "manufacturing_emissions": 6000,
    "source": "EPA"
  }' | sed -n 's/.*"_id":"\([^"]*\)".*/\1/p')
echo "ICE ID: $ICE_ID"
echo -e "\n"

echo "3. Adding an EV vehicle..."
EV_ID=$(curl -s -X POST "$BASE_URL/vehicles" \
  -H "Content-Type: application/json" \
  -d '{
    "make": "Tesla",
    "model": "Model 3",
    "type": "EV",
    "consumption": 15,
    "battery_kwh": 60,
    "manufacturing_emissions": 8000,
    "source": "EPA"
  }' | sed -n 's/.*"_id":"\([^"]*\)".*/\1/p')
echo "EV ID: $EV_ID"
echo -e "\n"

echo "4. Testing /api/compare..."
if [ -n "$ICE_ID" ] && [ -n "$EV_ID" ]; then
  curl -s -X POST "$BASE_URL/compare" \
    -H "Content-Type: application/json" \
    -d "{
      \"car1_id\": \"$ICE_ID\",
      \"car2_id\": \"$EV_ID\",
      \"annual_km\": 15000
    }"
else
  echo "Skipping comparison test due to missing vehicle IDs."
fi
echo -e "\n"

echo "5. Testing /api/ai/greenwash-check..."
curl -s -X POST "$BASE_URL/ai/greenwash-check" \
  -H "Content-Type: application/json" \
  -d '{
    "claim": "Our new eco-friendly SUV produces zero emissions from the tailpipe."
  }'
echo -e "\n"
