const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const newsRouter = require('./routes/news');
const cors = require('cors');

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
