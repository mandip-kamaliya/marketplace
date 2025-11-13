import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';

@Table({
  tableName: 'products',
  timestamps: true,
  paranoid: true
})
export class Product extends Model<Product> {
  // id is inherited from Model

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true
  })
  sku!: string;

  @Column(DataType.TEXT)
  description?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  price!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0
  })
  stock!: number;

  @Column(DataType.STRING(20))
  unit?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  isActive!: boolean;

  @ForeignKey(() => User)
  @Column
  sellerId!: number;

  @BelongsTo(() => User)
  seller!: User;

  // Timestamps
  // Timestamps are automatically handled by the base Model class
}
