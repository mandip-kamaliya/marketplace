import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import { User } from '../User';

@Table({ tableName: 'salesmen', timestamps: true })
export class Salesman extends Model<Salesman> {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @Column(DataType.STRING)
  declare name?: string;

  @Column(DataType.STRING)
  declare city?: string;

  @Column(DataType.STRING)
  declare area?: string;
}
