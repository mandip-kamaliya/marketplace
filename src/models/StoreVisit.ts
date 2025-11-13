import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';
import { Store } from './Store';

export enum VisitStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

@Table({
  tableName: 'store_visits',
  timestamps: true
})
export class StoreVisit extends Model<StoreVisit> {
  @ForeignKey(() => Store)
  @Column
  storeId!: number;

  @BelongsTo(() => Store)
  store!: Store;

  @ForeignKey(() => User)
  @Column
  salesmanId!: number;

  @BelongsTo(() => User, 'salesmanId')
  salesman!: User;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  scheduledAt!: Date;

  @Column({
    type: DataType.DATE
  })
  startedAt?: Date;

  @Column({
    type: DataType.DATE
  })
  completedAt?: Date;

  @Column({
    type: DataType.ENUM(...Object.values(VisitStatus)),
    defaultValue: VisitStatus.SCHEDULED
  })
  status!: VisitStatus;

  @Column(DataType.TEXT)
  notes?: string;

  @Column(DataType.DECIMAL(10, 2))
  totalSales?: number;
}
