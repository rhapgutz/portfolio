import mongoose from 'mongoose';
import { DEFAULT, ORDER_STATUSES } from '../utils/constants.js';

function getCosts(value) {
  if (typeof value !== 'undefined') {
    return parseFloat(value.toString());
  }
  return value;
}

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      //required: true,
      ref: 'User',
    },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUSES),
      default: DEFAULT.ORDER_STATUS,
    },
    number: {
      type: Number,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    totalAmount: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0.0,
      get: getCosts,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', OrderSchema);
