import { StatusCodes } from 'http-status-codes';
import Order from '../models/OrderModel.js';
import { sprintf } from 'sprintf-js';
import { ENTITY_MESSAGES } from '../utils/messages.js';
import { ENTITY } from '../utils/constants.js';

export const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json(orders);
};

export const getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.status(StatusCodes.OK).json(order);
};

export const createOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.status(StatusCodes.CREATED).json({
    message: sprintf(ENTITY_MESSAGES.SUCCESS_CREATE, {
      entity: ENTITY.ORDER,
    }),
    data: order,
  });
};

export const updateOrder = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({
    message: sprintf(ENTITY_MESSAGES.SUCCESS_UPDATE, {
      entity: ENTITY.ORDER,
    }),
    data: order,
  });
};

export const deleteOrder = async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({
    message: sprintf(ENTITY_MESSAGES.SUCCESS_DELETE, {
      entity: ENTITY.ORDER,
    }),
    data: order,
  });
};
