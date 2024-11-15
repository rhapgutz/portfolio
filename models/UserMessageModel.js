import mongoose from 'mongoose';

const UserMessageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    message: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model('UserMessage', UserMessageSchema);
