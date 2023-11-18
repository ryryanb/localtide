const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Get all news articles
router.get('/', async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific news article
router.get('/:id', getNews, (req, res) => {
  res.json(res.news);
});

// Create a news article
router.post('/', async (req, res) => {
  const news = new News(req.body);
  try {
    const newNews = await news.save();
    res.status(201).json(newNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware to get a specific news article by ID
async function getNews(req, res, next) {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }
    res.news = news;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
