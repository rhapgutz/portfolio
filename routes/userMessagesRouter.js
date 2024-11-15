import { Router } from 'express';
import UserMessageController from '../controllers/userMessageController.js';
import UserMessage from '../models/UserMessageModel.js';

const router = Router();
const userMessagesCtrl = new UserMessageController(UserMessage);

router.route('/').get(userMessagesCtrl.getAll);
export default router;
