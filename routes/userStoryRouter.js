import { Router } from 'express';
import UserStoryController from '../controllers/userStoryController.js';
import {
  validateUserStoryIdParam,
  validateUserStoryInput,
} from '../middleware/validationMiddleware.js';
import UserStory from '../models/UserStoryModel.js';

const router = Router();
const userStoryCtrl = new UserStoryController(UserStory);

router.route('/').post(validateUserStoryInput, userStoryCtrl.create);
router
  .route('/:id')
  .get(validateUserStoryIdParam, userStoryCtrl.getOne)
  .put(validateUserStoryInput, validateUserStoryIdParam, userStoryCtrl.update)
  .delete(validateUserStoryIdParam, userStoryCtrl.delete);

export default router;
