import express from 'express';
import RequestedUser from '../models/RequestedUsers.js';
import VerifiedUser from '../models/VerifiedUsers.js';

const router = express.Router();



router.get("/wardmemberlogin", async (req,res) => {
    const { user_id } = req.params;

    console.log(user_id)

    const requed_user = await RequestedUser.findById(user_id)

    res.send(requed_user)

    

})

export default router;
  