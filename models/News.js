const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: { type: Date, default: Date.now },
  category: String,
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
