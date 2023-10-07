const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const fs = require('fs');
const BookDetails = require('./Models/Books');
const connectDB = require('./Middleware/DB')

mongoose.connect('mongodb://localhost:27017/Books', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Read the JSON file
const jsonFilePath = './book_data.json';
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

// Insert the data from the JSON file into the MongoDB collection
async function insertData() {
  try {
    const result = await BookDetails.insertMany(jsonData);
    console.log(`Inserted ${result.length} documents into the collection.`);
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    mongoose.connection.close();
  }
}

insertData();
