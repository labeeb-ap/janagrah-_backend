import mongoose from 'mongoose';

const verifiedUserSchema = new mongoose.Schema({
  username: String,
  password: String,
  // Other fields as needed
});

const VerifiedUsers = mongoose.model('verifiedusers', verifiedUserSchema);

export default  VerifiedUsers;
   