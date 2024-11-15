import { Router } from 'express';
import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  updateTransaction,
} from '../controllers/transactionController.js';
import {
  validateTransactionIdParam,
  validateTransactionInput,
} from '../middleware/validationMiddleware.js';

const router = Router();

router.route('/').post(validateTransactionInput, createTransaction);
router
  .route('/:id')
  .get(validateTransactionIdParam, getTransaction)
  .put(validateTransactionInput, validateTransactionIdParam, updateTransaction)
  .delete(validateTransactionIdParam, deleteTransaction);

export default router;
