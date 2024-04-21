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
      res.status(200).json({
        "code": 200,
        "data": user,
        "success": true
      });
    } else {
      console.log('Ward member does not exist');
      res.status(404).json({
        "code": 100,
        "message": "Ward Member does not exist",
        "success":true
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



router.post('/userRequests', async (req, res) => {
  try {
    const { state, district, localgovernment, wardNo } = req.body;

    // Construct the query based on the provided fields
    const query = {
      state,
      district,
      localgovernment,
      wardNo
    };

    // Find all documents that match the query
    const users = await RequestedUsers.find(query);

    if (users.length > 0) {
      console.log('Users found:', users);
      res.status(200).json({ success: true, data: users });
    } else {
      console.log('No users found');
      res.status(200).json({ success: false, message: 'No users found' });
    }
  } catch (error) {
    console.error('Error in finding users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// Import the models for VerifiedUser and RequestedUsers


router.post('/userapprove', async (req, res) => {
  try {
    const { userId,username } = req.body; // Corrected to userId

    // Retrieve the username from local storage

    // Find the requested user by ID
    const user = await RequestedUsers.findById(userId);
    console.log(user) // Corrected to userId

    if (user) {
      // Create a new VerifiedUser document with the required fields
      const verifiedUser = new VerifiedUsers({
        wardmemberid: username,
        state: user.state,
        district: user.district,
        localgovernment: user.localgovernment,
        wardNo: user.wardNo,
        name: user.name,
        age: user.age,
        phone: user.phone,
        job: user.job,
        address: user.address,
        email: user.email,
        username: user.username,
        password: user.password,
        annualIncome: user.annualIncome,
        // Add more fields if needed
      });

      // Save the verified user to the database
      await verifiedUser.save();

      console.log('User approved and added to VerifiedUser:', verifiedUser);
      
      // If the insertion was successful, delete the user from the RequestedUsers collection
      await RequestedUsers.findByIdAndDelete(userId); // Corrected to userId

      console.log('User deleted from RequestedUsers collection');
      res.status(200).json({ success: true, message: 'User approved and added to VerifiedUser' });
    } else {
      console.log('No user found with the provided ID:', userId); // Corrected to userId
      res.status(404).json({ success: false, message: 'No user found with the provided ID' });
    }
  } catch (error) {
    console.error('Error in approving user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/reject', async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the requested user by ID
    const user = await RequestedUsers.findById(userId);

    if (user) {
      // If the user is found, delete the user from the RequestedUsers collection
      await RequestedUsers.findByIdAndDelete(userId);

      console.log('User deleted from RequestedUsers collection');
      res.status(200).json({ success: true, message: 'User rejected and deleted from RequestedUsers' });
    } else {
      console.log('No user found with the provided ID:', userId);
      res.status(404).json({ success: false, message: 'No user found with the provided ID' });
    }
  } catch (error) {
    console.error('Error rejecting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





export default router;
