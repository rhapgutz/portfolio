import { Router } from 'express';
import UserStoryVoteController from '../controllers/userStoryVoteController.js';
import {
  validateUserStoryVoteIdParam,
  validateUserStoryVoteInput,
} from '../middleware/validationMiddleware.js';
import UserStoryVote from '../models/UserStoryVoteModel.js';

const userStoryVoteCtrl = new UserStoryVoteController(UserStoryVote);

const userStoryVoteRouter = Router();
userStoryVoteRouter.route('/').post(validateUserStoryVoteInput, userStoryVoteCtrl.create);
userStoryVoteRouter
  .route('/:id')
  .get(validateUserStoryVoteIdParam, userStoryVoteCtrl.getOne)
  .put(validateUserStoryVoteInput, validateUserStoryVoteIdParam, userStoryVoteCtrl.update)
  .delete(validateUserStoryVoteIdParam, userStoryVoteCtrl.delete);


const userStoryVotesRouter = Router();
userStoryVotesRouter.route('/').get(userStoryVoteCtrl.getAll);

export { userStoryVoteRouter, userStoryVotesRouter }

