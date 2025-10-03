import BoPhanSchema from '@/api/schemas/BoPhan.schema'
import MaXuongSchema from '@/api/schemas/MaXuong.schema'
import SoMaySchema from '@/api/schemas/SoMay.schema'
import { DataTypes } from 'sequelize'
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'

const { INTEGER, STRING, TINYINT } = DataTypes

export type MaHang = {
  maHang: string
  tenHang?: string | null
  ghiChu?: string | null
  maBP?: string | null
  maXuong?: string | null
  soMay?: string | null
  stt?: number | null
  maHangChuan?: string | null
  maHangKiLuc?: string | null
  nhomQA?: string | null
}

@Table({
  modelName: 'MaHang',
  tableName: 'MaHang',
  timestamps: false // Required to set "false"
})
export default class MaHangSchema extends Model<MaHang> {
  @Column({ type: STRING(50), primaryKey: true, field: 'MaHang', unique: true })
  declare maHang: string

  @Column({ type: STRING(100), field: 'tenHang' })
  declare tenHang: string

  @Column({ type: STRING(500), field: 'GhiChu' })
  declare ghiChu: string

  @Column({ type: STRING(50), field: 'MaBP' })
  @ForeignKey(() => BoPhanSchema)
  declare maBP: string

  @Column({ type: STRING(50), field: 'MaXuong' })
  @ForeignKey(() => MaXuongSchema)
  declare maXuong: string

  @Column({ type: STRING(50), field: 'SoMay' })
  @ForeignKey(() => SoMaySchema)
  declare soMay: string

  @Column({ type: INTEGER, field: 'STT' })
  declare stt: number

  @Column({ type: STRING(50), field: 'MaHangChuan' })
  declare maHangChuan: string

  @Column({ type: STRING(50), field: 'MaHangKiLuc' })
  declare maHangKiLuc: string

  @Column({ type: STRING(50), field: 'NhomQA' })
  declare nhomQA: number
}
