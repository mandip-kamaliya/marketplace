import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';
import { config } from './config/env';
import routes from './routes';
import { initSequelize } from './db/sequelize';

export function createServer() {
  const app = express();

  // Security and parsing
  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Static uploads
  const uploadsPath = path.join(process.cwd(), config.uploadDir);
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
  }
  app.use('/uploads', express.static(uploadsPath));

  // Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Routes
  app.use('/api', routes);

  // Health
  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  // DB init lazily when the app starts
  initSequelize()
    .then(() => console.log('Database connected'))
    .catch((err) => console.error('Database connection error', err));

  // Error handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
  });

  return app;
}
