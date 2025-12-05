const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  firebaseUID: { type: String, required: true, unique: true }, // UID from Firebase
  email: { type: String, required: true },
  name: { type: String },
  role: { type: String, enum: ['admin','user'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', userSchema);
