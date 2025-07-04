import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const resextra = require('./modules/resextra');
const mount = require('mount-routes');
const createSocket = require('./services/socket');

const app = express();

// Start TCP server
createSocket();

/**
 * Public system initialization
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Unified response
app.use(resextra);

// 404 fallback
app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendResult(null, 404, 'Not Found');
});

app.listen(3000, () => {
  console.log('HTTP server is running on port 3000');
});

export default app;

