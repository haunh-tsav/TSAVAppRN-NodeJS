import { DataTypes } from 'sequelize'
import { Column, Model, Table } from 'sequelize-typescript'

const { INTEGER, STRING, FLOAT } = DataTypes

export type HangMuc = {
  maHangMuc: string
  tenHangMuc?: string | null
  tenNuocNgoai?: string | null
  kieuDuLieu?: number | null
  stt?: number | null
  congThuc?: string | null
  ghiChu?: string | null
}

@Table({
  modelName: 'HangMuc',
  tableName: 'dbo.HangMuc',
  timestamps: true
})
export default class HangMucSchema extends Model<HangMuc> {
  @Column({ type: STRING(50), primaryKey: true, field: 'MaHangMuc' })
  declare maHangMuc: string

  @Column({ type: STRING(500), field: 'TenHangMuc' })
  declare tenHangMuc: string

  @Column({ type: STRING(500), field: 'TenNuocNgoai' })
  declare tenNuocNgoai: string

  @Column({ type: INTEGER, field: 'KieuDuLieu' })
  declare kieuDuLieu: number

  @Column({ type: INTEGER, field: 'STT' })
  declare stt: number

  @Column({ type: STRING(500), field: 'CongThuc' })
  declare congThuc: string

  @Column({ type: STRING(500), field: 'GhiChu' })
  declare ghiChu: string
}
