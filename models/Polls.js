import mongoose from 'mongoose';

const { Schema } = mongoose;

const optionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
});

const pollSchema = new Schema({
  surveyNumber: {
    type: Number,
    required: true,
  },
  surveyName: {
    type: String,
    required: true,
  },
  targetedSection: {
    type: String,
    required: true,
  },
  surveyDescription: {
    type: String,
    required: true,
  },
  options: [optionSchema],
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
   currentstatus: {
    type: Boolean,
    default: true,
  }
});

const Polls = mongoose.model('Polls', pollSchema);

export default Polls;
