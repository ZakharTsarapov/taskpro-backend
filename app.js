import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import authRouter from './routes/api/authRoutes.js';
import boardRouter from './routes/api/boardRoutes.js';

import columnRouter from './routes/api/columnRoutes.js';

import swaggerUi from 'swagger-ui-express';
import path from 'path';
import fs from 'fs';
import taskRouter from './routes/api/taskRoutes.js';

const swaggerDocument = JSON.parse(fs.readFileSync(`${path.resolve()}/swagger.json`));

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use('/users', authRouter);
app.use('/boards', boardRouter);
app.use('/columns', columnRouter);

app.use('/tasks', taskRouter);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;
