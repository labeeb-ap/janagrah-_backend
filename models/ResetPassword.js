import mongoose from 'mongoose';

const { Schema } = mongoose;



const passwordResetTokenSchema = new mongoose.Schema({
    email: { type: String, required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '1h' } // Token expires in 1 hour
  });

  const PasswordResetToken = mongoose.model('passwordresettokens', passwordResetTokenSchema);

export default PasswordResetToken;
