import mongoose from 'mongoose';

const { Schema } = mongoose;



const announcementSchema = new Schema({
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
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  
});

const Announcement = mongoose.model('Announcement', announcementSchema);

export default Announcement;
