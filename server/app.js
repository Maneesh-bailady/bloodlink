const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bloodlink', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Donor model
const donorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  bloodGroup: String,
});
const Donor = mongoose.model('Donor', donorSchema);

// POST /api/donors - Register donor
app.post('/api/donors', async (req, res) => {
  try {
    const { name, age, bloodGroup } = req.body;
    if (!name || !age || !bloodGroup) return res.status(400).json({ error: 'Missing fields' });
    const donor = new Donor({ name, age, bloodGroup });
    await donor.save();
    res.status(201).json(donor);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/donors - List donors
app.get('/api/donors', async (req, res) => {
  try {
    const donors = await Donor.find().sort({ name: 1 });
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Blood request model and endpoints
const requestSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  units: Number,
  reason: String,
  createdAt: { type: Date, default: Date.now }
});
const Request = mongoose.model('Request', requestSchema);

// POST /api/requests - Request blood
app.post('/api/requests', async (req, res) => {
  try {
    const { name, bloodGroup, units, reason } = req.body;
    if (!name || !bloodGroup || !units) return res.status(400).json({ error: 'Missing fields' });
    const request = new Request({ name, bloodGroup, units, reason });
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/requests - List blood requests
app.get('/api/requests', async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/availability - Blood stock summary
app.get('/api/availability', async (req, res) => {
  try {
    // Count donors by blood group
    const donors = await Donor.aggregate([
      { $group: { _id: '$bloodGroup', count: { $sum: 1 } } }
    ]);
    const stock = {};
    donors.forEach(d => { stock[d._id] = d.count; });
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = app;
