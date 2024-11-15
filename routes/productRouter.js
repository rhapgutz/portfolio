import { Router } from 'express';
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import {
  validateProductIdParam,
  validateProductInput,
} from '../middleware/validationMiddleware.js';

const router = Router();

router
  .route('/:id')
  .get(validateProductIdParam, getProduct)
  .patch(validateProductInput, validateProductIdParam, updateProduct)
  .delete(validateProductIdParam, deleteProduct);
router.route('/').get(getAllProducts).post(validateProductInput, createProduct);

export default router;
