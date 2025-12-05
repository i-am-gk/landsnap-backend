const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create or update user (after Firebase signup)
router.post('/upsert', async (req, res) => {
  try {
    const { firebaseUID, email, name, role } = req.body;
    let user = await User.findOneAndUpdate(
      { firebaseUID },
      { firebaseUID, email, name, role: role || 'user' },
      { upsert: true, new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET user role by Firebase UID
router.get('/role', async (req, res) => {
  try {
    const { uid } = req.query;
    if (!uid) return res.status(400).json({ error: 'UID is required' });

    const user = await User.findOne({ firebaseUID: uid });
    if (!user) return res.status(404).json({ role: 'user' });

    res.json({ role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
