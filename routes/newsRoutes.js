import express from 'express';
import Announcement from "../models/Announcement.js";

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const {wardid,title,description} = req.body;
        //const {password} = req.body;
        console.log(req.body);

        const news = new Announcement({
            wardid,
            title,
            description,
            createdAt: Date.now() // Use Date.now() to get current timestamp
            
        }
    );

        // Save the user to the database
        await news.save();

        // Send a success response
        res.status(201).json({success:true, message: ' created announcement', news });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error in creating announcement:', error);
        res.status(500).json({ success:false, message: 'Internal server error' });
    }
});
router.post('/delete', async (req, res) => {
    try {
      const { msgId } = req.body;

      // Find the requested user by ID
      const announcement = await Announcement.findById(msgId);

      if (announcement) {
        // If the user is found, delete the user from the RequestedUsers collection
        await Announcement.findByIdAndDelete(msgId);
  
        console.log('Message deleted from Announcement collection');
        res.status(200).json({ success: true, message: ' Message deleted from RequestedUsers' });
      } else {
        console.log('No message found with the provided ID:', userId);
        res.status(404).json({ success: false, message: 'No message found with the provided ID' });
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
router.post('/send', async (req, res) => {
        try {
            const { wardid } = req.body;
            console.log(req.body);
            console.log(wardid)
            const msg = await Announcement.find({ wardid: wardid });
            console.log(msg);
            if (msg) {

                res.status(200).json({ success: true, message: 'announcement are send',msg });
             } else {
                console.log('not found')
                res.status(200).json({ success: false, message: 'Announcement are not sended' })
              }
        } catch (error) {
            // If an error occurs, send an error response
            console.error('Error in sending announcement:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
});
router.post('/show', async (req, res) => {
  try {
      const { wardid } = req.body;
      console.log(req.body);
      console.log(wardid)
      const msg = await Announcement.find({ wardid: wardid });
      console.log(msg.length);
      if (msg) {
          res.status(200).json({ success: true, message: 'announcement are shown',msg });
        } else {
          console.log('not found');
          res.status(200).json({ success: false, message: 'Announcement are not shown' })
        }
  } catch (error) {
      // If an error occurs, send an error response
      console.error('Error in showing announcement:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

    

export default router;
   