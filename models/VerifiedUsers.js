import mongoose from 'mongoose';

const { Schema } = mongoose;

const verifiedUserSchema = new Schema({
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  localAuthority: {
    type: String,
    required: true,
  },
  ward: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  
  },
  phone: {
    type: Number,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Making username unique

  },
  password: {
    type: String,
    required: true,
  },
  voterId: {
    type: String,
    required: true,
  },
  annualIncome: {
    type: Number,
    required: true,
  },
  wardmemberid: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('VerifiedUsers', verifiedUserSchema);
