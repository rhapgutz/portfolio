import { body, param, validationResult } from 'express-validator';
import pkg from 'validate-color';
const { validateHTMLColorHex } = pkg;
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import {
  CATEGORY_TYPES,
  REPEAT_SETTINGS,
  REPEAT_TYPES,
  TRANSACTION_TYPES,
} from '../utils/constants.js';
import Category from '../models/CategoryModel.js';
import Transaction from '../models/TransactionModel.js';
import mongoose from 'mongoose';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (
          errorMessages[0].startsWith('no category') ||
          errorMessages[0].startsWith('no transaction')
        ) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateCategoryInput = withValidationErrors([
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name must be between 1 and 50 characters long')
    .trim(),
  body('chartColor').custom(async (value) => {
    if (value && !validateHTMLColorHex(value))
      throw new BadRequestError('Invalid chart color');
  }),
]);

export const validateTransactionInput = withValidationErrors([
  body('transactionDate')
    .isDate()
    .withMessage('Transaction date must be a valid date'),
  body('type')
    .isIn(Object.values(TRANSACTION_TYPES))
    .withMessage('Invalid transaction type'),
  body('category').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError('invalid MongoDB id');
    const category = await Category.findById(value);
    if (!category) throw new NotFoundError(`no category with id : ${value}`);
  }),
  body('amount')
    .isDecimal()
    .withMessage('Transaction Amount must be a valid decimal value'),
  /* body('isRepeat').isBoolean().withMessage('Repeat must be a boolean'),
  body('repeatEvery.value')
    .isInt({ min: REPEAT_SETTINGS.MIN, max: REPEAT_SETTINGS.MAX })
    .withMessage('Repeat Every Value must be between 1 to 31'),
  body('repeatEvery.type')
    .isIn(Object.values(REPEAT_TYPES))
    .withMessage('Invalid Repeat Type'), */
]);

export const validateCategoryIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError('invalid MongoDB id');
    const category = await Category.findById(value);
    if (!category) throw new NotFoundError(`no category with id : ${value}`);
  }),
]);

export const validateCategoryTypeParam = withValidationErrors([
  param('type')
    .notEmpty()
    .withMessage('Category Type is required')
    .isIn(Object.values(CATEGORY_TYPES))
    .withMessage('Invalid Category Type'),
]);

export const validateTransactionIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError('invalid MongoDB id');
    const transaction = await Transaction.findById(value);
    if (!transaction)
      throw new NotFoundError(`no transaction with id : ${value}`);
  }),
]);

export const validateTransactionTypeParam = withValidationErrors([
  param('type')
    .notEmpty()
    .withMessage('Transaction Type is required')
    .isIn(Object.values(TRANSACTION_TYPES))
    .withMessage('Invalid Transaction Type'),
]);

export const validateProductIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError('invalid MongoDB id');
    const product = await Product.findById(value);
    if (!product) throw new NotFoundError(`no product with id : ${value}`);
  }),
]);

export const validateProductInput = withValidationErrors([
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name must be between 1 and 50 characters long')
    .trim(),
]);
