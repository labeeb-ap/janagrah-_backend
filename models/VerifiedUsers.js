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
  localgovernment: {
    type: String,
    required: true,
  },
  wardNo: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    // Remove unique constraint from name field
  },
  age: {
    type: Number,
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
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
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
  verified: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const VerifiedUser = mongoose.model('VerifiedUser', verifiedUserSchema);

export default VerifiedUser;
