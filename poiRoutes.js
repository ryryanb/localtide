const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/api/pois', async (req, res) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: '14.2920189,120.712076', // Example: San Francisco coordinates
        radius: 5000, // Radius in meters
        key: 'AIzaSyBxoqyPDn6JbsJtVEjXYyCxHES9yUilsiQ',
      },
    });

    console.log('Received data:', response.data);

    // Process the response and send POIs to the client
    const pois = response.data.results.map((result) => ({
      id: result.place_id,
      name: result.name,
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
    }));

    res.json(pois);
  } catch (error) {
    console.error('Error fetching POIs:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
