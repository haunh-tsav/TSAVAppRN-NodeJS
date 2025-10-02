import { DataTypes } from 'sequelize'
import { Column, Model, Table } from 'sequelize-typescript'

const { STRING } = DataTypes

export type MaXuong = {
  maXuong: string
  tenXuong?: string | null
}

@Table({
  modelName: 'MaXuong',
  tableName: 'MaXuong',
  timestamps: false // Required to set "false"
})
export default class BoPhanSchema extends Model<MaXuong> {
  @Column({ type: STRING(50), primaryKey: true, field: 'MaXuong', unique: true })
  declare maXuong: string

  @Column({ type: STRING(50), field: 'TenXuong' })
  declare tenXuong: string
}
