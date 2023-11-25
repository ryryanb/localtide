const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const newsRouter = require('./routes/news');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from a .env file

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
// Use CORS middleware
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/localnews', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Routes
app.use('/api/news', newsRouter);

app.get('/api/currents', async (req, res) => {
  try {
    const response = await axios.get('https://api.currentsapi.services/v1/search', {
      params: {
        keywords: 'Cavite',
        language: 'en',
        apiKey: 'RCT5_w2QXXGGoduY1lOnb1Q-e4LePiqORLx-KhW_09LBEDEo', // process.env.API_KEY Access API key from environment variable
      },
    });
    console.log(response.data);
    res.json(response.data.news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
