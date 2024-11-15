import mongoose from 'mongoose';

const UserStoryVoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      //required: true,
      ref: 'User',
    },
    userStory: {
      type: mongoose.Schema.Types.ObjectId,
      //required: true,
      ref: 'UserStory',
    },
    vote: {
      type: Number,
      required: true
    },
  },
  { timestamps: true }
);

export default mongoose.model('UserStoryVote', UserStoryVoteSchema);
