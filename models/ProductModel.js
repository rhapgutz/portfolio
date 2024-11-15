import mongoose from 'mongoose';

function getCosts(value) {
  if (typeof value !== 'undefined') {
    return parseFloat(value.toString());
  }
  return value;
}

const ProductSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      //required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0.0,
      get: getCosts,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Product', ProductSchema);
