import mongoose from 'mongoose';

const { Schema } = mongoose;

const requestedUserSchema = new Schema({
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
    required: true, // Changed to required
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  job: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,

  },
  annualIncome: {
    type: Number,
    required: true
  },
  voterId: {
    type: String,
    required: true,
  
  },
  image: {
    type: String,
    required: true,
  
  },
  
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  verified:{
    type:Boolean,
    default: false,
    required:true,
  }
});

const RequestedUsers = mongoose.model('RequestedUsers', requestedUserSchema);

export default RequestedUsers;
