import { Sequelize } from 'sequelize';
import { User } from '../models/User';
import { Product } from '../models/Product';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import { Store } from '../models/Store';
import { StoreVisit } from '../models/StoreVisit';
import sequelize from '../config/database';

// Initialize models
const models = {
  User,
  Product,
  Order,
  OrderItem,
  Store,
  StoreVisit,
  sequelize
};

// Set up model associations
export const setupAssociations = () => {
  // User associations
  User.hasMany(Product, { foreignKey: 'sellerId' });
  User.hasMany(Order, { foreignKey: 'customerId' });
  User.hasMany(Order, { foreignKey: 'deliveryPersonId' });
  User.hasMany(Store, { foreignKey: 'ownerId' });
  User.hasMany(StoreVisit, { foreignKey: 'salesmanId' });

  // Product associations
  Product.belongsTo(User, { foreignKey: 'sellerId' });
  Product.hasMany(OrderItem, { foreignKey: 'productId' });

  // Order associations
  Order.belongsTo(User, { foreignKey: 'customerId' });
  Order.belongsTo(User, { foreignKey: 'deliveryPersonId' });
  Order.hasMany(OrderItem, { foreignKey: 'orderId' });

  // OrderItem associations
  OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
  OrderItem.belongsTo(Product, { foreignKey: 'productId' });

  // Store associations
  Store.belongsTo(User, { foreignKey: 'ownerId' });
  Store.hasMany(StoreVisit, { foreignKey: 'storeId' });

  // StoreVisit associations
  StoreVisit.belongsTo(Store, { foreignKey: 'storeId' });
  StoreVisit.belongsTo(User, { foreignKey: 'salesmanId' });
};

export default models;
