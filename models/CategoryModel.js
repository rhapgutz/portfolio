import mongoose from 'mongoose';
import { CATEGORY_TYPES, DEFAULT } from '../utils/constants.js';

const CategorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      //required: true,
      ref: 'User',
    },
    type: {
      type: String,
      enum: Object.values(CATEGORY_TYPES),
      default: DEFAULT.CATEGORY_TYPE,
    },
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: DEFAULT.ICON,
    },
    chartColor: {
      type: String,
      default: DEFAULT.CHART_COLOR,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Category', CategorySchema);
