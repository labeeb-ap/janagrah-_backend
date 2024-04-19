const mongoose = require('mongoose');

const wardMemberSchema = new mongoose.Schema({
  username: String,
  password: String,
  // Other fields as needed
});

const WardMembers = mongoose.model('wardmembers', wardMemberSchema);

module.exports = WardMembers;
   