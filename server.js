import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import categoriesRouter from './routes/categoriesRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import transactionRouter from './routes/transactionRouter.js';

dotenv.config();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/categories', categoriesRouter);
app.use('/api/category', categoryRouter);
app.use('/api/transactions', transactionRouter);

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
