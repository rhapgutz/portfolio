import { StatusCodes } from 'http-status-codes';
import Transaction from '../models/TransactionModel.js';
import Category from '../models/CategoryModel.js';

export const getAllTransactions = async (req, res) => {
  const transactions = await Transaction.find({}).populate('category').exec();
  res.status(StatusCodes.OK).json(transactions);
};

export const getTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  res.status(StatusCodes.OK).json(transaction);
};

export const createTransaction = async (req, res) => {
  const transaction = (await Transaction.create(req.body)).populate('category').exec();
  res.status(StatusCodes.CREATED).json(transaction);
};

export const updateTransaction = async (req, res) => {
  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.status(StatusCodes.OK).json(transaction);
};

export const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json(true);
};

export const getTransactionsByType = async (req, res) => {
  const { type } = req.params;
  const transactions = await Transaction.find({ type });
  res.status(StatusCodes.OK).json(transactions);
};
