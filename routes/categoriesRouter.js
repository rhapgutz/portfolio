import { Router } from 'express';
import {
  getAllCategories,
} from '../controllers/categoryController.js';
import { authorizePermissions } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/').get(authorizePermissions('admin'), getAllCategories);

export default router;
