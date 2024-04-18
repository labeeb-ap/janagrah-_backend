import mongoose from 'mongoose';

const { Schema } = mongoose;

const verifiedUserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const VerifiedUser = mongoose.model('VerifiedUser', verifiedUserSchema);

export default VerifiedUser;
