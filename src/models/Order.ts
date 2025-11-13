import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from './User';
import { OrderItem } from './OrderItem';
import { OrderStatus } from './types';

@Table({
  tableName: 'orders',
  timestamps: true,
  paranoid: true
})
export class Order extends Model<Order> {
  @Column({
    type: DataType.ENUM(...Object.values(OrderStatus)),
    defaultValue: OrderStatus.PENDING
  })
  status!: OrderStatus;

  @Column(DataType.DECIMAL(10, 2))
  totalAmount!: number;

  @Column(DataType.TEXT)
  shippingAddress?: string;

  @Column(DataType.STRING(20))
  contactNumber?: string;

  @ForeignKey(() => User)
  @Column
  customerId!: number;

  @BelongsTo(() => User, 'customerId')
  customer!: User;

  @HasMany(() => OrderItem)
  orderItems?: OrderItem[];

  // Delivery person who will handle this order
  @ForeignKey(() => User)
  @Column
  deliveryPersonId?: number;

  @BelongsTo(() => User, 'deliveryPersonId')
  deliveryPerson?: User;

  @Column(DataType.DATE)
  deliveredAt?: Date;

  @Column(DataType.TEXT)
  deliveryNotes?: string;
}
