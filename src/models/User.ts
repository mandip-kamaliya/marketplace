import { Table, Column, Model, DataType, Unique, AllowNull, Default, HasOne, HasMany } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';
import { Product } from './Product';
import { Order } from './Order';
import { Store } from './Store';
import { StoreVisit } from './StoreVisit';

export enum UserRole {
  SELLER = 'seller',
  SALESMAN = 'salesman',
  DELIVERY = 'delivery',
  CUSTOMER = 'customer',
  ADMIN = 'admin'
}

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true
})
export class User extends Model<User> {
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(100))
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  passwordHash!: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  name!: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    defaultValue: UserRole.CUSTOMER
  })
  role!: UserRole;

  @Column(DataType.STRING(20))
  phone?: string;

  @Column(DataType.STRING(255))
  address?: string;

  @Column(DataType.STRING(100))
  city?: string;

  @Column(DataType.STRING(20))
  postalCode?: string;

  @Column(DataType.STRING(50))
  country?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  isActive!: boolean;

  // Seller specific fields
  @Column(DataType.TEXT)
  businessName?: string;

  @Column(DataType.STRING(50))
  taxId?: string;

  // Delivery person specific fields
  @Column(DataType.STRING(50))
  vehicleNumber?: string;

  @Column(DataType.STRING(50))
  licenseNumber?: string;

  // Salesman specific fields
  @Column(DataType.STRING(50))
  employeeId?: string;

  // Customer specific fields
  @Column(DataType.DATEONLY)
  dateOfBirth?: Date;

  // Associations
  @HasMany(() => Product, 'sellerId')
  products?: Product[];

  @HasMany(() => Order, 'customerId')
  orders?: Order[];

  @HasMany(() => Order, 'deliveryPersonId')
  deliveries?: Order[];

  @HasMany(() => Store, 'ownerId')
  ownedStores?: Store[];

  @HasMany(() => StoreVisit, 'salesmanId')
  storeVisits?: StoreVisit[];

  // Authentication methods
  static async hashPassword(plain: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plain, salt);
  }

  async validatePassword(plain: string): Promise<boolean> {
    return bcrypt.compare(plain, this.passwordHash);
  }

  // Instance type guards
  isSeller(): this is User & { role: UserRole.SELLER } {
    return this.role === UserRole.SELLER;
  }

  isSalesman(): this is User & { role: UserRole.SALESMAN } {
    return this.role === UserRole.SALESMAN;
  }

  isDeliveryPerson(): this is User & { role: UserRole.DELIVERY } {
    return this.role === UserRole.DELIVERY;
  }

  isCustomer(): this is User & { role: UserRole.CUSTOMER } {
    return this.role === UserRole.CUSTOMER;
  }

  isAdmin(): this is User & { role: UserRole.ADMIN } {
    return this.role === UserRole.ADMIN;
  }
}
