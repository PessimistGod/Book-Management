const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const fs = require('fs');
const BookDetails = require('./Models/Books');

async function main() {
  try {
    // Connect to MongoDB before performing any database operations
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const jsonFilePath = './book_data.json';
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    const result = await BookDetails.insertMany(jsonData);
    console.log(`Inserted ${result.length} documents into the collection.`);
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    // Close the MongoDB connection when done
    mongoose.connection.close();
  }
}

// Call the main function to start the process
main();
