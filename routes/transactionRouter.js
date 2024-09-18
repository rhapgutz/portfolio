import { Router } from 'express';
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransaction,
  updateTransaction,
} from '../controllers/transactionController.js';
import {
  validateTransactionIdParam,
  validateTransactionInput,
} from '../middleware/validationMiddleware.js';

const router = Router();

router
  .route('/')
  .get(getAllTransactions)
  .post(validateTransactionInput, createTransaction);
router
  .route('/:id')
  .get(validateTransactionIdParam, getTransaction)
  .put(validateTransactionInput, validateTransactionIdParam, updateTransaction)
  .delete(validateTransactionIdParam, deleteTransaction);

export default router;
