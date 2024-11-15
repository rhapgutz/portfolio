import { Router } from 'express';
import {
  getAllTransactions,
} from '../controllers/transactionController.js';

const router = Router();

router.route('/').get(getAllTransactions);

export default router;
