const mongoose = require('mongoose');
const KhasraSchema = new mongoose.Schema({
  khasraNumber: { type: String, required: true, unique: true },
  ownerName: { type: String },
  area: { type: String },
  landType: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Khasra', KhasraSchema);
