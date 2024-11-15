import Transaction from '../models/TransactionModel.js';

export const getTransactionsGroupByMonthAndYear = async () => {
  return Transaction.aggregate([
    {
      $match: {
        /* "joined" is an ISODate field */
        transactionDate: { $ne: null },
      },
    },
    {
      /* group by year and month of the subscription event */
      $group: {
        _id: {
          year: {
            $year: '$transactionDate',
          },
          month: {
            $month: '$transactionDate',
          },
        },
        totalAmount: { $sum: '$amount' },
      },
    },
    {
      /* sort descending (latest subscriptions first) */
      $sort: {
        '_id.year': -1,
        '_id.month': -1,
      },
    },
    {
      $limit: 100,
    },
  ]);
};

export const getTransactionsByMonthAndYear = async (year, month) => {
  return Transaction.aggregate([
    {
      $match: {
        $expr: {
          $eq: [year, { $year: '$transactionDate' }],
          $eq: [month, { $month: '$transactionDate' }],
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
        _id: '$_id',
        transactionDate: '$transactionDate',
        amount: '$amount',
        category: '$cat',
      },
    },
  ]);
};

export const getCategoryTotalTransactionsByMonthAndYear = async (
  year,
  month
) => {
  return Transaction.aggregate([
    {
      $match: {
        $expr: {
          $eq: [year, { $year: '$transactionDate' }],
          $eq: [month, { $month: '$transactionDate' }],
        },
      },
    },
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
        name: '$cat.name',
        type: '$cat.type',
        icon: '$cat.icon',
        chartColor: '$cat.chartColor',
        totalAmount: 1,
      },
    },
  ]);
};
