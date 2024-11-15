import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import categoriesRouter from './routes/categoriesRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import transactionRouter from './routes/transactionRouter.js';
import transactionsRouter from './routes/transactionsRouter.js';
import userStoriesRouter from './routes/userStoriesRouter.js';
import userStoryRouter from './routes/userStoryRouter.js';
import { userStoryVoteRouter, userStoryVotesRouter } from './routes/userStoryVoteRouter.js';
import { userMessageRouter, userMessagesRouter } from './routes/userMessageRouter.js';
import authRouter from './routes/authRouter.js';
import { authenticateUser } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const baseApi = '/api/';

app.use(`${baseApi}categories`, authenticateUser, categoriesRouter);
app.use(`${baseApi}category`, authenticateUser, categoryRouter);

app.use(`${baseApi}transactions`, authenticateUser, transactionsRouter);
app.use(`${baseApi}transaction`, authenticateUser, transactionRouter);

app.use(`${baseApi}userstories`, authenticateUser, userStoriesRouter);
app.use(`${baseApi}userstory`, authenticateUser, userStoryRouter);

app.use(`${baseApi}userstoryvotes`, authenticateUser, userStoryVotesRouter);
app.use(`${baseApi}userstoryvote`, authenticateUser, userStoryVoteRouter);

app.use(`${baseApi}usermessages`, authenticateUser, userMessagesRouter);
app.use(`${baseApi}usermessage`, authenticateUser, userMessageRouter);

app.use(`${baseApi}auth`, authRouter)

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
