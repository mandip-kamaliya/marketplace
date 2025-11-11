import { Table, Column, Model, DataType, Unique, AllowNull, Default, HasOne } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';
import { Seller } from './seller/Seller';
import { Salesman } from './salesman/Salesman';
import { DeliveryPerson } from './delivery/DeliveryPerson';
import { Customer } from './customer/Customer';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {
  declare id: number;
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  declare email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare passwordHash: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @Column(DataType.ENUM('seller', 'salesman', 'delivery', 'customer', 'admin'))
  declare role: 'seller' | 'salesman' | 'delivery' | 'customer' | 'admin';

  @Column(DataType.STRING)
  declare phone?: string;

  @HasOne(() => Seller)
  declare seller?: Seller;

  @HasOne(() => Salesman)
  declare salesman?: Salesman;

  @HasOne(() => DeliveryPerson)
  declare deliveryPerson?: DeliveryPerson;

  @HasOne(() => Customer)
  declare customer?: Customer;

  static async hashPassword(plain: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plain, salt);
  }

  async validatePassword(plain: string) {
    return bcrypt.compare(plain, this.passwordHash);
  }
}
