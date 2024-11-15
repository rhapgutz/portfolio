import mongoose from 'mongoose';

const WebSocketSessionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('WebSocketSession', WebSocketSessionSchema);
