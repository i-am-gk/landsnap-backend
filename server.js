const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // loads .env

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Models
const User = require('./models/user');
const Khasra = require('./models/khasra');

// Routes
const userRoutes = require('./routes/user');
const khasraRoutes = require('./routes/khasra');

app.use('/api/users', userRoutes);
app.use('/api/khasra', khasraRoutes);

// Test route
app.get('/', (req, res) => res.send('Backend is running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
