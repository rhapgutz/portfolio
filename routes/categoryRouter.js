import { Router } from 'express';
import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryWithTotalAmount,
} from '../controllers/categoryController.js';
import {
  validateCategoryIdParam,
  validateCategoryInput,
} from '../middleware/validationMiddleware.js';

const router = Router();

router.route('/with-total-amount').get(getCategoryWithTotalAmount);
//router.route('/:type').get(validateCategoryTypeParam, getCategoriesByType);
router
  .route('/:id')
  .get(validateCategoryIdParam, getCategory)
  .patch(validateCategoryInput, validateCategoryIdParam, updateCategory)
  .delete(validateCategoryIdParam, deleteCategory);
router
  .route('/')
  .get(getAllCategories)
  .post(validateCategoryInput, createCategory);

export default router;
