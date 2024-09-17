import { StatusCodes } from 'http-status-codes';
import Category from '../models/CategoryModel.js';
import { sprintf } from 'sprintf-js';
import { ENTITY_MESSAGES } from '../utils/messages.js';
import { ENTITY } from '../utils/constants.js';
import { getCategoriesWithTotalTransactionAmount } from '../useCases/categoryUseCase.js';

export const getAllCategories = async (req, res) => {
  const categories = await Category.find({});
  res.status(StatusCodes.OK).json(categories);
};

export const getCategoryWithTotalAmount = async (req, res) => {
  const categories = await getCategoriesWithTotalTransactionAmount();
  res.status(StatusCodes.OK).json({ categories });
};

export const getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.status(StatusCodes.OK).json(category);
};

export const createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(StatusCodes.CREATED).json({
    message: sprintf(ENTITY_MESSAGES.SUCCESS_CREATE, {
      entity: ENTITY.CATEGORY,
    }),
    data: category,
  });
};

export const updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({
    message: sprintf(ENTITY_MESSAGES.SUCCESS_UPDATE, {
      entity: ENTITY.CATEGORY,
    }),
    data: category,
  });
};

export const deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({
    message: sprintf(ENTITY_MESSAGES.SUCCESS_DELETE, {
      entity: ENTITY.CATEGORY,
    }),
    data: category,
  });
};

export const getCategoriesByType = async (req, res) => {
  const { type } = req.params;
  const categories = await Category.find({ type });
  res.status(StatusCodes.OK).json(categories);
};
