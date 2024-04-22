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

export default router;
