import { Sequelize } from 'sequelize-typescript';
import { config } from '../config/env';
import { User } from '../models/User';
import { Seller } from '../models/seller/Seller';
import { Salesman } from '../models/salesman/Salesman';
import { DeliveryPerson } from '../models/delivery/DeliveryPerson';
import { Customer } from '../models/customer/Customer';

let sequelize: Sequelize | null = null;

export function getSequelize(): Sequelize {
  if (!sequelize) throw new Error('Sequelize has not been initialized');
  return sequelize;
}

export async function initSequelize() {
  if (sequelize) return sequelize;

  sequelize = new Sequelize({
    database: config.db.name,
    dialect: 'mysql',
    username: config.db.user,
    password: config.db.password,
    host: config.db.host,
    port: config.db.port,
    models: [User, Seller, Salesman, DeliveryPerson, Customer],
    logging: false
  });

  await sequelize.authenticate();
  // In dev, sync models. For prod, use migrations.
  await sequelize.sync();

  return sequelize;
}
