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
  localAuthorities: {
    type: String,
    required: true,
  },
  wardNo: {
    type: Number,
    required: true,
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
    unique: true
  },
  annualIncome: {
    type: Number,
    required: true
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
