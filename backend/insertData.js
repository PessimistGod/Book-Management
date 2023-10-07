const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const fs = require('fs');
const BookDetails = require('./Models/Books');

mongoose.connect('mongodb://localhost:27017/Books', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const jsonFilePath = './book_data.json';
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));


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
