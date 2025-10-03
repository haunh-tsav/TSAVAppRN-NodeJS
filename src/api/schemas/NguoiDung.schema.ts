import BoPhanSchema from '@/api/schemas/BoPhan.schema'
import MaXuongSchema from '@/api/schemas/MaXuong.schema'
import NhanVienSchema, { NhanVien } from '@/api/schemas/NhanVien.schema'
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'

const { TINYINT, STRING } = DataType

export interface NguoiDung {
  tenDangNhap: string
  matKhau?: string | null
  maNV?: string | null
  quanTri?: number | null
  maBP?: string | null
  maXuong?: string | null
}

@Table({
  modelName: 'NguoiDung',
  tableName: 'NguoiDung',
  timestamps: false // Required to set "false"
})
export default class NguoiDungSchema extends Model<NguoiDung> {
  @Column({ type: STRING(50), primaryKey: true, field: 'TenDangNhap', unique: true })
  declare tenDangNhap: string

  @Column({ type: STRING(100), field: 'MatKhau' })
  declare matKhau: string

  @Column({ type: STRING(50), field: 'MaNhanVien' })
  @ForeignKey(() => NhanVienSchema)
  declare maNV: string

  @Column({ type: TINYINT, field: 'QuanTri' })
  declare quanTri: number

  @Column({ type: STRING(50), field: 'MaBP' })
  @ForeignKey(() => BoPhanSchema)
  declare maBP: string

  @Column({ type: STRING(50), field: 'MaXuong' })
  @ForeignKey(() => MaXuongSchema)
  declare maXuong: string
}
