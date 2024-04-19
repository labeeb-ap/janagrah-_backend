import express from 'express';
import RequestedUsers from "../models/RequestedUsers.js";
import WardMembers from '../models/WardMembers.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await WardMembers.findOne({ username, password });
    if (user) {
      console.log(user);
      res.json({
        "code": 200,
        "data": user
      })
    } else {
      res.json({
        "code": 100,
        "message": "Ward Member does not exist"
      })
    }

  } catch (error) {
    // If an error occurs, send an error response
    console.error('Error in user registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





export default router;
