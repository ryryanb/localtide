const mongoose = require('mongoose');
const News = require('./models/News'); // Import your Mongoose model

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/localnews', { useNewUrlParser: true, useUnifiedTopology: true });

// Sample data
const newsData = [
  {
    title: 'Local Event 1',
    content: 'Exciting event happening in our community!',
    author: 'Admin',
    category: 'Events',
  },
  {
    title: 'New Business Opening',
    content: 'A new business has opened in the neighborhood.',
    author: 'Admin',
    category: 'Business',
  },
  // Add more sample data as needed
];

// Seed data into the database
async function seedDatabase() {
  try {
    // Clear existing data
    await News.deleteMany({});

    // Insert new data
    const seededNews = await News.create(newsData);

    console.log('Database seeded successfully:', seededNews);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

// Run the seeder
seedDatabase();
