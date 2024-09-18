import { Router } from 'express';
import {
  getCategory,
  updateCategory,
  deleteCategory,
  createCategory,
} from '../controllers/categoryController.js';
import {
  validateCategoryIdParam,
  validateCategoryInput,
} from '../middleware/validationMiddleware.js';

const router = Router();

router.route('/').post(validateCategoryInput, createCategory);
router
  .route('/:id')
  .get(validateCategoryIdParam, getCategory)
  .put(validateCategoryInput, validateCategoryIdParam, updateCategory)
  .delete(validateCategoryIdParam, deleteCategory);

export default router;
