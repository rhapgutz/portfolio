import mongoose from 'mongoose';
import { DEFAULT, USER_STORY_STATUSES } from '../utils/constants.js';

const UserStorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      enum: Object.values(USER_STORY_STATUSES),
      default: DEFAULT.USER_STORY_STATUS,
    },
    code: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    storyPoints: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model('UserStory', UserStorySchema);
