import express from 'express';
import RequestedUsers from "../models/RequestedUsers.js";
import WardMembers from '../models/WardMembers.js';
import VerifiedUsers from '../models/VerifiedUsers.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import PasswordResetToken from '../models/ResetPassword.js';

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
      res.status(200).json({ success: true, message: 'Login successful' ,user});
    } else {
      console.log('not exist'),
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

      
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'akakhome22@gmail.com',
          pass: 'tjiu lgqe mqlu demz'
        }
      });
      
      var mailOptions = {
        from: 'akakhome22@gmail.com',
        to: user.email,
        subject: 'Janagrah Account Approved',
        text: 'Congratulations, Your account has been approved and now you can login. Thank you for using Janagrah'
        
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(200).json({ success: false, message:"error sending email" });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({ success: true,message:"email sent" });
        }
      });
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

      

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'akakhome22@gmail.com',
          pass: 'tjiu lgqe mqlu demz'
        }
      });
      
      var mailOptions = {
        from: 'akakhome22@gmail.com',
        to: user.email,
        subject: 'Janagrah Account Rejected ',
        text: 'Your janagrah account has been Rejected. please check again '
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(200).json({ success: false, message:"error sending email" });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({ success: true,message:"email sent" });
        }
      });
      

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


router.post('/image', async (req, res) => {
  try {
    const { username } = req.body;

    // Find the user by username
    const user = await WardMembers.findOne({ username });

    if (user) {
      console.log('User found:', user);
      // Assuming the image data is stored in a field called 'image'
      res.status(200).json({ success: true, data: { image: user.image } });
    } else {
      console.log('No user found');
      res.status(404).json({ success: false, message: 'No user found' });
    }
  } catch (error) {
    console.error('Error fetching user image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to request a password reset link
router.post('/forgot', async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await VerifiedUsers.findOne({ email }) || await WardMembers.findOne({ email });

    if (user) {
      // Generate a unique token
      const token = crypto.randomBytes(16).toString('hex');

      // Create a new password reset token and save it
      const resetToken = new PasswordResetToken({ email, token });
      await resetToken.save();
      console.log(resetToken);
      // Create the transporter for sending email
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'akakhome22@gmail.com',
          pass: 'tjiu lgqe mqlu demz' // Use your actual app password here
        }
      });

      // Email options
      var mailOptions = {
        from: 'akakhome22@gmail.com',
        to: email,
        subject: 'Janagrah Account Reset Password',
        text: `Click the following link to reset your password: http://localhost:3000/ResetPassword/${token}`
      };

      // Send the email
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
          res.status(500).json({ success: false, message: "Error sending email" });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({ success: true, message: "Email sent" });
        }
      });

    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error processing request:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Route to reset password
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    console.log(token);
    console.log(password);
    const resetToken = await PasswordResetToken.findOne({ token:token });

    // Validate token and password format/length here
    if (!/^[0-9a-fA-F]{32}$/.test(token)) {
      console.log('Invalid token format',token);
      return res.status(400).json({ success: false, message: 'Invalid token format' });
    }
    if (!password || typeof password !== 'string' || password.length < 8) {
      console.log('password.error');
      return res.status(400).json({ success: false, message: 'Invalid password format' });
    }

    console.group(resetToken);
    if (!resetToken) {
      console.log('resettoken');
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
      
    }
    // Find the user by email in VerifiedUsers
    let user = await VerifiedUsers.findOne({ email: resetToken.email });

    if (user) {
      // Update the password
      user.password = password;

      // Save the updated user
      await user.save();
    } else {
      // Find the user by email in WardMembers
      user = await WardMembers.findOne({ email: resetToken.email });

      if (user) {
        // Update the password
        user.password = password;

        // Save the updated user
        await user.save();
      } else {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
    }

    // Delete the reset token after successful password reset
    await resetToken.deleteOne();
    console.log('sucessful');
    res.status(200).json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});













export default router;
