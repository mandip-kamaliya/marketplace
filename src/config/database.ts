import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'marketplace_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      paranoid: true,
      underscored: true,
    },
  }
);

// Import models to register them with sequelize
import '../models/User';
import '../models/Product';
import '../models/Store';
import '../models/Order';
import '../models/OrderItem';
import '../models/StoreVisit';

export default sequelize;
