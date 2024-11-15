import { Router } from 'express';
import UserMessageController from '../controllers/userMessageController.js';
import {
  validateUserMessageIdParam,
  validateUserMessageInput,
} from '../middleware/validationMiddleware.js';
import UserMessage from '../models/UserMessageModel.js';

const userMessageCtrl = new UserMessageController(UserMessage);

const userMessageRouter = Router();
userMessageRouter.route('/').post(validateUserMessageInput, userMessageCtrl.create);
userMessageRouter
  .route('/:id')
  .get(validateUserMessageIdParam, userMessageCtrl.getOne)
  .put(validateUserMessageInput, validateUserMessageIdParam, userMessageCtrl.update)
  .delete(validateUserMessageIdParam, userMessageCtrl.delete);

const userMessagesRouter = Router();
userMessagesRouter.route('/').get(userMessageCtrl.getAll);

export { userMessageRouter, userMessagesRouter };
