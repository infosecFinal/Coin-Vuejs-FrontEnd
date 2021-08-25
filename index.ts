iimport express from 'express';
import { logger } from './config/winston.js';

const app = express().Application;

app.listen(3000, () => {
  logger.info('Server listening on port 3000');
});

app.get('/', (req, res) => {
  logger.info('GET /');
  res.sendStatus(200);
});

app.get('/error', (req, res) => {
  logger.error('Error message');
  res.sendStatus(500);
});
