import express from 'express';
import RequestedUsers from "../models/RequestedUsers.js";
import WardMembers from '../models/WardMembers.js';
import VerifiedUsers from '../models/userLogin.js';

const router = express.Router();

//ward login
router.post('/wardlogin', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Username:', username);
    console.log('Password:', password);
    const user = await WardMembers.findOne({ username, password });
   
    if (user) {
      console.log('Ward member exists:', user);
      res.json({
        "code": 200,
        "data": user
      });
    } else {
      console.log('Ward member does not exist');
      res.status(404).json({
        "code": 100,
        "message": "Ward Member does not exist"
      });
    }

  } catch (error) {
    console.error('Error in ward member login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//User login
router.post('/userlogin', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('username:',username);
    console.log('Password:',password);
    const user = await VerifiedUsers.findOne({ username, password });
    if (user) {
      console.log('exist')
      console.log(user);
      res.json({
        "code": 200,
        "data": user
      })
    } else {
      console.log('not exist')
      res.json({
        "code": 100,
        "message": "User does not exist"
      })
    }

  } catch (error) {
    // If an error occurs, send an error response
    console.error('Error in user registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.post('/userRequests', async (req, res) => {
  try {
    const { state, district, localgovernment, wardNo } = req.body;
    console.log('State:', state);
    console.log('District:', district);
    console.log('Local Government:', localgovernment);
    console.log('Ward Number:', wardNo);

    // Assuming you have a MongoDB model named VerifiedUsers
    const users = await RequestedUsers.find({ 
      state,
      district,
      localgovernment,
      wardNo
    });

    if (users && users.length > 0) {
      console.log('Users found:', users);
      res.json({
        code: 200,
        data: users
      });
    } else {
      console.log('No users found');
      res.json({
        code: 100,
        message: 'No users found with the provided details'
      });
    }
  } catch (error) {
    // If an error occurs, send an error response
    console.error('Error in fetching user requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






export default router;
