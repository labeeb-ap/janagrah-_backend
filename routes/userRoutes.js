import express from 'express';
import RequestedUsers from "../models/RequestedUsers.js";

const router = express.Router();

router.post('/request-user', async (req, res) => {
    try {
        const { state, district, localAuthorities, wardNo, name, age, phone, job, address, email, username, password, annualIncome } = req.body;
        //const {password} = req.body;
        console.log(req.body);

        const user = new RequestedUsers({
            state,
            district,
            localAuthorities,
            wardNo,
            name,
            age,
            phone,
            job,
            address,
            email,
            username,
            password,
            annualIncome, // Just as an example, replace with req.body.age or any logic to get age
            createdAt: Date.now() // Use Date.now() to get current timestamp
            
        }
    );

        // Save the user to the database
        await user.save();

        // Send a success response
        //res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error in user registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



    

export default router;
   