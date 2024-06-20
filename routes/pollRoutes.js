import express from 'express';
import Polls from "../models/Polls.js";
import result from "../models/result.js";


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
      const userPolls = await Polls.find({username:username });
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





  router.post('/dosurvey', async (req, res) => {
    try {
      const { wardmemberid, job,username } = req.body;
      console.log(req.body);
      // Construct the query conditions based on username and targetedSection
     // Step 1: Fetch all surveys that have already been done by the user
const doneSurveys = await result.find({ username: username });
console.log("done",doneSurveys)

// Step 2: Extract the survey IDs
const doneSurveyIds = doneSurveys.map(survey => survey.surveyId); 
console.log("sureveydones",doneSurveyIds);

// Step 3: Construct the query to exclude done surveys
const query = {
  username: wardmemberid, // Match the username with wardmemberid
  $or: [
    { targetedSection: job }, // Either the targetedSection matches the job
    { targetedSection: 'Everyone' } // or the targetedSection is 'Everyone'
  ],
  currentstatus: true, // and the currentstatus is true
  _id: { $nin: doneSurveyIds } // Exclude surveys already done
};

// Fetch all polls based on the constructed query
const polls = await Polls.find(query);

      console.log("querydata",polls)
  
      if (polls.length > 0) {
        // If polls were found, return them
        res.status(200).json({ success: true, polls });
      } else {
        // If no polls were found with the provided criteria
        console.log('No polls found with the provided criteria');
        res.status(404).json({ success: false, message: 'No polls found with the provided criteria' });
      }
    } catch (error) {
      console.error('Error fetching polls:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });







  router.post('/addresult', async (req, res) => {
    try {
      const { surveyId, selectedOptionId, username } = req.body;
      console.log(req.body);
  
      // Check if any document in the collection matches the surveyId and username
      const existingResult = await result.findOne({ surveyId, username });
  
      if (existingResult) {
        // If a result already exists for the given surveyId and username, return a message
        console.log('Result already exists for survey:', surveyId, 'and username:', username);
        return res.status(400).json({ success: false, message: 'you already done ' });
      } else {
        // If no result exists, add a new result to the collection
        const newResult = new result({ surveyId, selectedOptionId, username });
        await newResult.save();
        return res.status(200).json({ success: true, message: 'Survey result recorded successfully.' });

  
        // Update the currentStatus parameter to false for the surveyId
        
      }
    } catch (error) {
      console.error('Error updating survey:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });





  router.post('/result', async (req, res) => {
    try {
      const { surveyId } = req.body;
      console.log(req.body);
  
      // Find the poll with the given surveyId
      const poll = await Polls.findOne({ _id: surveyId });
      console.log(poll);
  
      if (!poll) {
        // If no poll is found, return an error message
        console.log('Poll not found for surveyId:', surveyId);
        return res.status(404).json({ success: false, message: 'Poll not found' });
      }
  
      // Traverse each option and extract the IDs and texts
      const optionData = poll.options.map(option => ({ id: option._id, text: option.text }));
  
      // Initialize an object to store the count of datasets for each option
      const optionCounts = {};
  
      // Loop through each option data and count the datasets
      for (const option of optionData) {
        const count = await result.countDocuments({ surveyId, selectedOptionId: option.id });
        optionCounts[option.text] = count;
      }
  
      // Log or return the result
      console.log(optionCounts);
      return res.status(200).json({ success: true, optionCounts }); // Pass optionCounts as part of the response
    } catch (error) {
      console.error('Error retrieving result:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  


export default router;
