import Transaction from '../models/TransactionModel.js';

export const getCategoriesWithTotalTransactionAmount = async () => {
  return Transaction.aggregate([
    {
      $group: {
        _id: '$category',
        totalAmount: { $sum: '$amount' },
      },
    },
    {
      $addFields: {
        category: {
          $toObjectId: '$_id',
        },
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'cat',
      },
    },
    { $unwind: '$cat' },
    {
      $project: {
        _id: '$cat._id',
        name: '$cat.name',
        type: '$cat.type',
        icon: '$cat.icon',
        chartColor: '$cat.chartColor',
        totalAmount: 1,
      },
    },
  ]);
};
