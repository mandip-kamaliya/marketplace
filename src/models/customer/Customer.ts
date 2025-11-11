import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import { User } from '../User';

@Table({ tableName: 'customers', timestamps: true })
export class Customer extends Model<Customer> {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @Column(DataType.STRING)
  declare addressLine1?: string;

  @Column(DataType.STRING)
  declare city?: string;

  @Column(DataType.STRING)
  declare area?: string;

  @Column(DataType.STRING)
  declare pincode?: string;
}
