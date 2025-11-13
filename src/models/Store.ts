import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from './User';
import { StoreVisit } from './StoreVisit';

export enum StoreType {
  RETAIL = 'retail',
  WHOLESALE = 'wholesale',
  WAREHOUSE = 'warehouse'
}

@Table({
  tableName: 'stores',
  timestamps: true,
  paranoid: true
})
export class Store extends Model<Store> {
  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  name!: string;

  @Column(DataType.TEXT)
  description?: string;

  @Column({
    type: DataType.ENUM(...Object.values(StoreType)),
    defaultValue: StoreType.RETAIL
  })
  type!: StoreType;

  @Column(DataType.STRING(200))
  address?: string;

  @Column(DataType.STRING(100))
  city?: string;

  @Column(DataType.STRING(20))
  postalCode?: string;

  @Column(DataType.STRING(50))
  country?: string;

  @Column(DataType.STRING(20))
  phone?: string;

  @Column(DataType.STRING(100))
  email?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  isActive!: boolean;

  @ForeignKey(() => User)
  @Column
  ownerId?: number;

  @BelongsTo(() => User, 'ownerId')
  owner?: User;

  @HasMany(() => StoreVisit)
  visits?: StoreVisit[];
}
