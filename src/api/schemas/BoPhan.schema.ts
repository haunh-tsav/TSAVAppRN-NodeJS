import { DataTypes } from 'sequelize'
import { Column, Model, Table } from 'sequelize-typescript'

const { INTEGER, STRING, TINYINT } = DataTypes

export type BoPhan = {
  maBP: string
  tenBP?: string | null
  ghiChu?: string | null
  stt?: number | null
  maXuong?: string | null
  isLine?: number | null
  useBudget?: number | null
}

@Table({
  modelName: 'BoPhan',
  tableName: 'BoPhan',
  timestamps: false // Required to set "false"
})
export default class BoPhanSchema extends Model<BoPhan> {
  @Column({ type: STRING(50), primaryKey: true, field: 'MaBP', unique: true })
  declare maBP: string

  @Column({ type: STRING(100), field: 'TenBP' })
  declare tenBP: string

  @Column({ type: STRING(200), field: 'GhiChu' })
  declare ghiChu: string

  @Column({ type: INTEGER, field: 'STT' })
  declare stt: number

  @Column({ type: STRING(50), field: 'MaXuong' })
  declare maXuong: string

  @Column({ type: TINYINT, field: 'IsLine' })
  declare isLine: number

  @Column({ type: TINYINT, field: 'UseBudget' })
  declare useBudget: string
}
