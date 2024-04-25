import mongoose from 'mongoose';

const { Schema } = mongoose;

const resultSchema = new Schema({
  surveyId: {
    type: String, // Change the type to String
    required: true,
  },
  selectedOptionId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const result = mongoose.model('result', resultSchema);

export default result;
