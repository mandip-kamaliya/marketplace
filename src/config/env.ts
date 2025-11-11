import dotenv from 'dotenv';
dotenv.config();

function requireEnv(name: string, fallback?: string) {
  const val = process.env[name] ?? fallback;
  if (!val) throw new Error(`Missing env var: ${name}`);
  return val;
}

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  jwtSecret: requireEnv('JWT_SECRET', 'change_me'),
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'example',
    name: process.env.DB_NAME || 'marketplace'
  }
};
