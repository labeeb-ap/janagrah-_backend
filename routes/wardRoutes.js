import express from 'express';
import RequestedUsers from "../models/RequestedUsers.js";
import WardMembers from '../models/WardMembers.js';
import VerifiedUsers from '../models/VerifiedUsers.js';



const router = express.Router();


//ward login
router.post('/wardlogin', async (req, res) => {
  try {
    const { username, password } = req.body;
<<<<<<< HEAD
    console.log('Username:', username);
    console.log('Password:', password);
    console.log(req.body)
=======


    console.log('Username:', username);
    console.log('Password:', password);

>>>>>>> 696da52718107d4250da2bf54f8a5e73476b75eb
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
     // const token = jwt.sign({ userId: user._id, username: user.username }, 'janagrah',{ expiresIn: '1h' });
      res.status(200).json({ success: true, message: 'Login successful' ,user});
    } else {
      console.log('not exist'),
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
    const { state, district, localAuthority, ward } = req.body;

    // Construct the query based on the provided fields
    const query = {
      state,
      district,
      localAuthority,
      ward
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


router.post('/userapprove', async (req, res) => {
  try {
    const { userId, username } = req.body;

    const user = await RequestedUsers.findById(userId);

    if (user) {
      // Check if the username already exists in VerifiedUsers collection
      const existingUser = await VerifiedUsers.findOne({username:user.username });


      if (existingUser) {
        console.log('User with the provided username already exists in VerifiedUsers:', user.username);
        return res.status(400).json({ success: false, message: 'User with the provided username already approved ' });
      }

      const VerifiedUser = new VerifiedUsers({
        state: user.state,
        district: user.district,
        localAuthority: user.localAuthority,
        ward: user.ward,
        name: user.name,
        image:user.image,
        age: user.age,
        phone: user.phone,
        job: user.job,
        address: user.address,
        email: user.email,
        username: user.username,
        password: user.password,
        voterId: user.voterId,
        annualIncome: user.annualIncome,
        createdAt: Date.now(),
        wardmemberid: username
      });

      await VerifiedUser.save();

      await RequestedUsers.findByIdAndDelete(userId);

      console.log('User approved and added to VerifiedUser:', username);
      return res.status(200).json({ success: true, message: 'User approved and added to VerifiedUser' });
    } else {
      console.log('No user found with the provided ID:', userId);
      return res.status(404).json({ success: false, message: 'No user found with the provided ID' });
    }
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.address) {
      // Duplicate address error
      console.error('Duplicate address:', error.keyValue.address);
      return res.status(400).json({ success: false, message: 'Address already exists' });
    }
    // Handle other errors
    console.error('Error in approving user:', error);
    return res.status(500).json({ message: 'Internal server error' });
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
















router.post('/viewUser', async (req, res) => {
  try {
    const { wardmemberid } = req.body;

    // Construct the query based on the provided fields
  

    // Find all documents that match the query
    const users = await VerifiedUsers.find({wardmemberid:wardmemberid});

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




















export default router;
