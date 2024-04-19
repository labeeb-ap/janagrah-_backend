import express from 'express';
import RequestedUser from '../models/RequestedUsers.js';
import VerifiedUser from '../models/VerifiedUsers.js';

const router = express.Router();

router.post('/request-user', async (req, res) => {
    try {
        const { state,district,gramaPanchayat,wardNo,name,age,job,address,email,username,password,annualIncome } = req.body;
        //const {password} = req.body;
        console.error(password);

        const user = new RequestedUser({
            state,
            district,
            gramaPanchayat,
            wardNo,
            name,
            age,
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
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error in user registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get("/verify-user/:user_id", async (req,res) => {
    const { user_id } = req.params;

    console.log(user_id)

    const requed_user = await RequestedUser.findById(user_id)

    res.send(requed_user)

    

})

export default router;
   