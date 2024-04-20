import express from 'express';
import RequestedUsers from "../models/RequestedUsers.js";
import WardMembers from '../models/WardMembers.js';
import VerifiedUsers from '../models/userLogin.js';

const router = express.Router();

//ward login
router.post('/wardlogin', async (req, res) => {
  try {
    console.log(req.body)
    const { username, password } = req.body;
    console.log('Username:',username);
    console.log('Password:',password);
    const user = await WardMembers.findOne({ username, password });
   
    if (user) {
      console.log('exist');
      console.log(user);
      /*res.json({
        "code": 200,
        "data": user
      })*/
      res.status(200).json({ success: true, message: 'Ward Member Login successful' });
    } else {
      /*res.json({
        "code": 100,
        "message": "Ward Member does not exist"
      })*/
      console.log('not exist');
      res.status(200).json({ success: false, message: ' ward member Login unsuccessful' });
    }

  } catch (error) {
    // If an error occurs, send an error response
    console.error('Error in authority registration:', error);
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
      //res.json({
       // "code": 200,
       // "data": user
      //})
      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      console.log('not exist')
      /*res.json({
        "code": 100,
        "message": "User does not exist"
      })*/
      res.status(200).json({ success: false, message: 'Login unsuccessful' })
    }

  } catch (error) {
    // If an error occurs, send an error response
    console.error('Error in user registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





export default router;
