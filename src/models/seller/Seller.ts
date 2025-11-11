import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AllowNull, Default, Unique } from 'sequelize-typescript';
import { User } from '../User';

@Table({ tableName: 'sellers', timestamps: true })
export class Seller extends Model<Seller> {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  declare storeName: string;

  @Column(DataType.STRING)
  declare city?: string;

  @Column(DataType.STRING)
  declare area?: string;

  @Column(DataType.STRING)
  declare pincode?: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare active: boolean;
}
