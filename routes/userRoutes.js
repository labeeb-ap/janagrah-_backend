import express from 'express';
import RequestedUsers from "../models/RequestedUsers.js";
import VerifiedUsers from '../models/VerifiedUsers.js';
import sharp from 'sharp';

const router = express.Router();

router.post('/request-user', async (req, res) => {
    try {
        const { state, district, localAuthority, ward, voterId, name, age, phone, job, address, email, username, password, annualIncome, image } = req.body;
        
        // Compressing image to 20KB
        const compressedImage = await sharp(Buffer.from(image, 'base64'))
            .resize({ fit: 'inside', withoutEnlargement: true })
            .toFormat('jpeg')
            .jpeg({ quality: 30 }) // Adjust quality as needed
            .toBuffer();

        // Convert compressed image buffer back to base64
        const compressedImageBase64 = compressedImage.toString('base64');

        const user = new RequestedUsers({
            state,
            district,
            localAuthority,
            ward,
            voterId,
            name,
            age,
            phone,
            job,
            address,
            email,
            username,
            password,
            annualIncome,
            image: compressedImageBase64, // Saving compressed image as base64
            createdAt: Date.now() 
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.log('Error in user registration:', error);
        res.status(500).json({ message:error });
    }
});

router.post('/image', async (req, res) => {
  try {
    const { username } = req.body;

    // Find the user by username
    const user = await VerifiedUsers.findOne({ username });

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

router.post('/details', async (req, res) => {
    try {
      console.log("Complete Details of residents");
      const { wardid} = req.body;
      console.log(req.body)
      
      
      const users = await VerifiedUsers.find({wardmemberid:wardid });
      console.log(users);
      const total= users.length
      console.log(total);
      if (users.length > 0) {
        res.status(200).json({ success: true, message:'Message found',users,total });
      } else{
        console.log('No Message found for the user:', userMsg);
        res.status(404).json({ success: false, message: 'No Message found for the user' });
      }
    } catch (error) {
      console.error('Error fetching user message:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.post('/edit', async (req, res) => {
  try {
    console.log('edit');
    const updatedData = req.body;
    console.log(updatedData);
    // Find the user by username and update the profile
    const user = await VerifiedUsers.findOneAndUpdate(
      { username: updatedData.username },
      updatedData,
      { new: true }
    );
    console.log(user);
    res.status(200).json({ success: true, message:'successfully edited',user});
    console.log('successfully edited');
  } catch (error) {
    console.error('Error editing profile:', error.message);
    res.status(500).send('Server Error');
  }
});

router.post('/delete', async (req, res) => {
  try {
    const { residentId } = req.body;
    console.log(residentId);
    const deletedResident = await VerifiedUsers.findByIdAndDelete(residentId);
    if (deletedResident) {
      res.json({ success: true, message: 'Resident deleted successfully.' });
    } else {
      res.status(404).json({ success: false, message: 'Resident not found.' });
    }
  } catch (error) {
    console.error('Error deleting resident:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});




export default router;

