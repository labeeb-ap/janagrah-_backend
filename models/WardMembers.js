import mongoose from 'mongoose';

const wardMemberSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const WardMembers = mongoose.model('wardmembers', wardMemberSchema);

export default WardMembers;
