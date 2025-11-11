import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AllowNull, Default } from 'sequelize-typescript';
import { User } from '../User';

@Table({ tableName: 'deliveryPeople', timestamps: true })
export class DeliveryPerson extends Model<DeliveryPerson> {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @Column(DataType.STRING)
  declare vehicleNo?: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare active: boolean;
}
