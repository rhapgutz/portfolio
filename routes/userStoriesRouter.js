import { Router } from 'express';
import UserStoryController from '../controllers/userStoryController.js';
import {
  validateUserStoryInput,
} from '../middleware/validationMiddleware.js';
import UserStory from '../models/UserStoryModel.js';

const router = Router();
const userStoryCtrl = new UserStoryController(UserStory);

router.route('/').get(userStoryCtrl.getAll);
export default router;
