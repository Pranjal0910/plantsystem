const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// MongoDB credentials
const mongo_uri = "mongodb+srv://pranjal:edhas@cluster0.yrxljar.mongodb.net/";
mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB database");
});

// Define schema and models for pests and diseases (assuming you have defined schemas for them)

// Define routes for fetching latest detected pests and diseases
app.get('/latest-pests', async (req, res) => {
  try {
    const latestPests = await Pest.find().sort({ detectedDate: -1 }).limit(1);
    res.json(latestPests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/latest-diseases', async (req, res) => {
  try {
    const latestDiseases = await Disease.find().sort({ detectedDate: -1 }).limit(1);
    res.json(latestDiseases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
