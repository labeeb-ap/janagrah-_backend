import express from 'express';
import Message from "../models/Message.js";

const router = express.Router();

router.post('/send', async (req, res) => {
    try {
        const {userid,wardid,message,anonymous} = req.body;
        //const {password} = req.body;
        console.log(req.body);
        console.log(message);
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
      const msg = await Message.findById(msgId);

      if (msg) {
        // If the user is found, delete the user from the RequestedUsers collection
        await Message.findByIdAndDelete(msgId);
  
        console.log('Message deleted from  collection');
        res.status(200).json({ success: true, message: ' Message deleted from Users' });
      } else {
        console.log('No message found with the provided ID:', userId);
        res.status(404).json({ success: false, message: 'No message found with the provided ID' });
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.post('/show', async (req, res) => {
    try {
      console.log("Message show");
      const { userid} = req.body;
      console.log(req.body)
      
      
      const userMsg = await Message.find({userid:userid });
      console.log(userMsg)
      console.log(userMsg.length);
      if (userMsg.length > 0) {
        // If polls are found, return the list of polls
        res.status(200).json({ success: true, message:'Message found',userMsg });
      } else{
        console.log('No Message found for the user:', userMsg);
        res.status(404).json({ success: false, message: 'No Message found for the user' });
      }
    } catch (error) {
      console.error('Error fetching user message:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.post('/visible', async (req, res) => {
    try {
      console.log("Message visible");
      const { wardid} = req.body;
      console.log(req.body)
      
      
      const userMsg = await Message.find({wardid:wardid });
      console.log(userMsg)
      console.log(userMsg.length);
      if (userMsg.length > 0) {
        res.status(200).json({ success: true, message:'Message found',userMsg });
      } else{
        console.log('No Message found for the user:', userMsg);
        res.status(404).json({ success: false, message: 'No Message found for the user' });
      }
    } catch (error) {
      console.error('Error fetching user message:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.put('/read/:messageId', async (req, res) => {
    try {
      // Retrieve the message ID from the request parameters
      const { messageId } = req.params;
  
      // Find the message in the database by its ID and update its read status to true
      const Read = await Message.findByIdAndUpdate(messageId, { read: true });
      console.log(Read);
      // Send a success response
      res.status(200).send({ message: 'Message read status updated successfully' ,Read});
    } catch (error) {
      // If an error occurs, send a 500 internal server error response
      console.error('Error updating message read status:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  });

    

export default router;
   