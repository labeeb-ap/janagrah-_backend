import express from 'express';
import Announcement from "../models/Message.js";

const router = express.Router();

router.post('/send', async (req, res) => {
    try {
        const {userid,wardid,message,anonymous} = req.body;
        //const {password} = req.body;
        console.log(req.body);

        const msg = new Message({
           userid,
           wardid,
           message,
           createdAt: Date.now(), // Use Date.now() to get current timestamp
           anonymous,
            
        }
    );

        // Save the user to the database
        await msg.save();

        // Send a success response
        res.status(201).json({success:true, message: ' Successfully send message', msg });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error in sending message:', error);
        res.status(500).json({ success:false, message: 'Internal server error' });
    }
});
router.post('/delete', async (req, res) => {
    try {
      const { msgId } = req.body;

      // Find the requested user by ID
      const msg = await Announcement.findById(msgId);

      if (msg) {
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
            const { wardmemberid } = req.body;
            console.log(req.body);
            console.log(wardmemberid)
            const msg = await Announcement.find({ wardid: wardmemberid });
            console.log(msg);
            if (msg) {
                //console.log('resident fro')
                
                //res.status(200).json({ announcements });
                res.status(200).json({ success: true, message: 'announcement are send',msg });
              } else {
                console.log('not found')
                /*res.json({
                  "code": 100,
                  "message": "User does not exist"
                })*/
                res.status(200).json({ success: false, message: 'Announcement are not sended' })
              }
        } catch (error) {
            // If an error occurs, send an error response
            console.error('Error in sending announcement:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
});



    

export default router;
   