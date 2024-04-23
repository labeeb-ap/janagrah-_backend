import express from 'express';
import Polls from "../models/Polls.js";

const router = express.Router();

router.post('/createpoll', async (req, res) => {
    try {
        const { surveyNumber, surveyName, targetedSection, surveyDescription, options, username } = req.body;
        console.log(req.body);

        if (!Array.isArray(options)) {
            throw new Error('Options must be an array');
        }

        const validatedOptions = options.map(option => {
            if (typeof option !== 'string') {
                throw new Error('Each option must be a string');
            }
            return { text: option }; // Convert each option string to an object with a "text" property
        });

        const user = new Polls({
            surveyNumber,
            surveyName,
            targetedSection,
            surveyDescription,
            options: validatedOptions,
            username,
            createdAt: Date.now(),
            currentstatus:true
        });

        await user.save();

        res.status(201).json({ message: 'Poll created successfully', poll: user });
    } catch (error) {
        console.error('Error in creating poll:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




router.post('/showpoll', async (req, res) => {
    try {
      const { username } = req.body;
      console.log(req.body)
      
      // Retrieve polls associated with the provided username
      const userPolls = await Polls.find({username:username,currentstatus: true });
      console.log(userPolls)
      
      if (userPolls.length > 0) {
        // If polls are found, return the list of polls
        res.status(200).json({ success: true, polls: userPolls });
      } else {
        console.log('No polls found for the user:', username);
        res.status(404).json({ success: false, message: 'No polls found for the user' });
      }
    } catch (error) {
      console.error('Error fetching user polls:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });




  router.post('/stopPolling', async (req, res) => {
    try {
      const { surveyId } = req.body;
      console.log(req.body)
  
      // Update the currentStatus parameter to false for the surveyId
      const updatedSurvey = await Polls.findOneAndUpdate(
        { _id: surveyId },
        { currentstatus: false }, // Update currentStatus to false
        { new: true } // Return the updated document
      );
  
      if (updatedSurvey) {
        // If the survey was updated successfully, return the updated survey
        res.status(200).json({ success: true, updatedSurvey });
      } else {
        // If no survey was found with the provided surveyId
        console.log('No survey found with ID:', surveyId);
        res.status(404).json({ success: false, message: 'No survey found with the provided ID' });
      }
    } catch (error) {
      console.error('Error updating survey:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  





export default router;
