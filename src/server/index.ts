import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import csurf from 'csurf';
import dotenv from 'dotenv';
import path from 'path';

// Load env variables (do not commit .env)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Security middlewares
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Disabled CSRF protection for development – remove this line in production
// app.use(csurf({ cookie: true }));

// Serve static assets (logos, etc.)
app.use('/assets', express.static(path.join(__dirname, '../../public/assets')));

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Placeholder for future routes (auth, ai, uploads, payments, admin, student)
app.get('/api/placeholder', (req: Request, res: Response) => {
  res.json({ message: 'Placeholder route – implement later' });
});

// Global error handler (CSRF errors etc.)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
