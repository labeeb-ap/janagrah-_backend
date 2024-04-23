import express from 'express';
import RequestedUsers from "../models/RequestedUsers.js";

const router = express.Router();

router.post('/request-user', async (req, res) => {
    try {
        const { state, district, localAuthority, ward, voterId, name, age, phone, job, address, email, username, password, annualIncome } = req.body;
        console.log(state)
        
        const user = new RequestedUsers({
            state,
            district,
            localAuthority, // Corrected
            ward, // Corrected
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
            createdAt: Date.now() 
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error in user registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
