import mongoose from 'mongoose';

const { Schema } = mongoose;



const messageSchema = new Schema({
  userid: {
    type: String,
    required: true,
  },
  wardid: {
    type: String,
    required: true,
  },
  content:{
    type:String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  anonymous: {
    type: Boolean,
    default: false,
  }
  
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
