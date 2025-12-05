const express = require('express');
const router = express.Router();
const Khasra = require('../models/khasra');

// Add
router.post('/add', async (req, res) => {
  try {
    const data = req.body;
    const exists = await Khasra.findOne({ khasraNumber: data.khasraNumber });
    if (exists) return res.status(400).json({ msg: 'Khasra exists' });
    const newK = new Khasra(data);
    await newK.save();
    res.json(newK);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Update
router.put('/update/:id', async (req, res) => {
  try {
    const updated = await Khasra.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Delete
router.delete('/delete/:id', async (req, res) => {
  try {
    await Khasra.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Get by khasra number
router.get('/search', async (req, res) => {
  try {
    const { khasra } = req.query;
    const record = await Khasra.findOne({ khasraNumber: khasra });
    if (!record) return res.status(404).json({ msg: 'Not found' });
    res.json(record);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// List all
router.get('/all', async (req, res) => {
  try {
    const list = await Khasra.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
