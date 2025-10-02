import BoPhanSchema from '@/api/schemas/BoPhan.schema'
import MaXuongSchema from '@/api/schemas/MaXuong.schema'
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'

const { INTEGER, STRING, BOOLEAN } = DataType

export interface NhanVien {
  maNV: string
  hoTen?: string | null
  maBP?: string | null
  maXuong?: string | null
  loai?: string | null
  chucVu?: string | null
  maLoc?: string | null | null
  email?: string | null
}

@Table({
  modelName: 'NhanVien',
  tableName: 'NhanVien',
  timestamps: false // Required to set "false"
})
export default class NhanVienSchema extends Model<NhanVien> {
  @Column({ type: STRING(50), primaryKey: true, field: 'MaNV', unique: true })
  declare maNV: string

  @Column({ type: STRING(100), field: 'HoTen' })
  declare hoTen: string

  @Column({ type: STRING(50), field: 'MaBP' })
  @ForeignKey(() => BoPhanSchema)
  declare maBP: string

  @Column({ type: STRING(50), field: 'MaXuong' })
  @ForeignKey(() => MaXuongSchema)
  declare maXuong: string

  @Column({ type: STRING(50), field: 'Loai' })
  declare loai: string

  @Column({ type: STRING(50), field: 'ChucVu' })
  declare chucVu: string

  @Column({ type: STRING(50), field: 'MaLoc' })
  declare maLoc: string

  @Column({ type: STRING(50), field: 'Email' })
  declare email: string
}
