import { initSequelize, getSequelize } from '../db/sequelize';
import { User } from '../models/User';
import { Seller } from '../models/seller/Seller';
import { Salesman } from '../models/salesman/Salesman';
import { DeliveryPerson } from '../models/delivery/DeliveryPerson';
import { Customer } from '../models/customer/Customer';

async function main() {
  await initSequelize();

  // Clear tables for idempotent seed (dev only)
  await Customer.destroy({ where: {} });
  await DeliveryPerson.destroy({ where: {} });
  await Salesman.destroy({ where: {} });
  await Seller.destroy({ where: {} });
  await User.destroy({ where: {} });

  // Users
  const password = await User.hashPassword('password123');

  const admin = await User.create({
    email: 'admin@example.com',
    passwordHash: password,
    name: 'Admin',
    role: 'admin',
    phone: '9999999999'
  } as any);

  const sellerUser1 = await User.create({
    email: 'seller1@example.com',
    passwordHash: password,
    name: 'Seller One',
    role: 'seller'
  } as any);
  const sellerUser2 = await User.create({
    email: 'seller2@example.com',
    passwordHash: password,
    name: 'Seller Two',
    role: 'seller'
  } as any);

  const salesmanUser = await User.create({
    email: 'salesman@example.com',
    passwordHash: password,
    name: 'Sales Man',
    role: 'salesman'
  } as any);

  const deliveryUser = await User.create({
    email: 'delivery@example.com',
    passwordHash: password,
    name: 'Delivery Person',
    role: 'delivery'
  } as any);

  const customerUser1 = await User.create({
    email: 'customer1@example.com',
    passwordHash: password,
    name: 'Customer One',
    role: 'customer'
  } as any);
  const customerUser2 = await User.create({
    email: 'customer2@example.com',
    passwordHash: password,
    name: 'Customer Two',
    role: 'customer'
  } as any);

  await Seller.create({ userId: sellerUser1.id, storeName: 'Store One', city: 'CityA', area: 'AreaA', pincode: '111111' } as any);
  await Seller.create({ userId: sellerUser2.id, storeName: 'Store Two', city: 'CityB', area: 'AreaB', pincode: '222222' } as any);

  await Salesman.create({ userId: salesmanUser.id, name: 'Sales Man', city: 'CityA', area: 'AreaA' } as any);
  await DeliveryPerson.create({ userId: deliveryUser.id, vehicleNo: 'KA-01-AB-1234', active: true } as any);

  await Customer.create({ userId: customerUser1.id, addressLine1: 'Addr 1', city: 'CityA', area: 'AreaA', pincode: '111111' } as any);
  await Customer.create({ userId: customerUser2.id, addressLine1: 'Addr 2', city: 'CityB', area: 'AreaB', pincode: '222222' } as any);

  console.log(`Seed complete. Users:
    admin@example.com
    seller1@example.com
    seller2@example.com
    salesman@example.com
    delivery@example.com
    customer1@example.com
    customer2@example.com
  All with password: password123`);

  await getSequelize().close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
