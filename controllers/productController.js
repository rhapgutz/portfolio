import { StatusCodes } from 'http-status-codes';
import Product from '../models/ProductModel.js';
import { sprintf } from 'sprintf-js';
import { ENTITY_MESSAGES } from '../utils/messages.js';
import { ENTITY } from '../utils/constants.js';

export const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json(products);
};

export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(StatusCodes.OK).json(product);
};

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({
    message: sprintf(ENTITY_MESSAGES.SUCCESS_CREATE, {
      entity: ENTITY.PRODUCT,
    }),
    data: product,
  });
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({
    message: sprintf(ENTITY_MESSAGES.SUCCESS_UPDATE, {
      entity: ENTITY.PRODUCT,
    }),
    data: product,
  });
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({
    message: sprintf(ENTITY_MESSAGES.SUCCESS_DELETE, {
      entity: ENTITY.PRODUCT,
    }),
    data: product,
  });
};
