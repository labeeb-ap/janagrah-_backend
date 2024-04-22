import mongoose from 'mongoose';

const { Schema } = mongoose;



const announcementSchema = new Schema({
  wardid: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description:{
    type:String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  
});

const Announcement = mongoose.model('Announcement', announcementSchema);

export default Announcement;
