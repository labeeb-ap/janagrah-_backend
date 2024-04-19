const express = require('express');
const router = express.Router();
const WardMembers = require('../models/wardMemberLogin.js'); // Assuming you have a WardMember modelw
router.post('/wardmemberlogin', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query MongoDB to find a ward member with the given username and password
    const user = await WardMembers.findOne({ username, password });

    if (user) {
      // User found, login successful
      res.json({ message: 'Login successful' });
    } else {
      // User not found or incorrect password
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
     