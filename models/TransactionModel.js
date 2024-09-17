import mongoose from 'mongoose';
import {
  TRANSACTION_TYPES,
  REPEAT_TYPES,
  DEFAULT,
  REPEAT_SETTINGS,
} from '../utils/constants.js';

function getCosts(value) {
  if (typeof value !== 'undefined') {
    return parseFloat(value.toString());
  }
  return value;
}

const TransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      //required: true,
      ref: 'User',
    },
    type: {
      type: String,
      enum: Object.values(TRANSACTION_TYPES),
      default: DEFAULT.TRANSACTION_TYPE,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
    amount: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0.0,
      get: getCosts,
    },
    isRepeat: {
      type: Boolean,
      default: false,
    },
    repeatEvey: {
      value: {
        type: Number,
        min: REPEAT_SETTINGS.MIN,
        max: REPEAT_SETTINGS.MAX,
        default: DEFAULT.REPEAT_VALUE,
      },
      type: {
        type: String,
        enum: Object.values(REPEAT_TYPES),
        default: DEFAULT.REPEAT_TYPE,
      },
    },
    note: String,
  },
  { timestamps: true, toJSON: { getters: true } }
);

export default mongoose.model('Transaction', TransactionSchema);
