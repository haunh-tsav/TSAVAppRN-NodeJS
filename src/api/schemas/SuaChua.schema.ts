import BoPhanSchema from '@/api/schemas/BoPhan.schema'
import MaXuongSchema from '@/api/schemas/MaXuong.schema'
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'

const { INTEGER, STRING, DATE } = DataType

export interface SuaChua {
  id: string
  ngay?: Date | null
  nguoiTao?: string | null
  nguoiThucHien?: string | null
  maBP?: string | null
  maXuong?: string | null
  maHang?: string | null
  tinhTrang?: string | null
  noiDungThucHien?: string | null
  maLoi?: string | null
  ketQua?: string | null
  status?: number | null
  ghiChu?: string | null
  maMay?: string | null
  xuLy?: string | null
  soCD?: string | null
  batDau?: Date | null
  ketThuc?: Date | null
  updateTime?: Date | null
  nguoiXacNhan?: string | null
  sl?: number | null
  slKiemTra?: number | null
  nguyenNhanLoiMay?: string | null
  replace?: string | null
  sttXuLy?: string | null
  moTaLoi?: string | null
}

@Table({
  modelName: 'SuaChua',
  tableName: 'SuaChua',
  timestamps: false // Required to set "false"
})
export default class SuaChuaSchema extends Model<SuaChua> {
  @Column({ type: STRING(50), primaryKey: true, field: 'ID', unique: true })
  declare id: string

  @Column({ type: DATE, field: 'Ngay' })
  declare ngay: Date

  @Column({ type: STRING(50), field: 'NguoiTao' })
  declare nguoiTao: string

  @Column({ type: STRING(50), field: 'NguoiThucHien' })
  declare nguoiThucHien: string

  @Column({ type: STRING(50), field: 'MaBP' })
  @ForeignKey(() => BoPhanSchema)
  declare maBP: string

  @Column({ type: STRING(50), field: 'MaXuong' })
  @ForeignKey(() => MaXuongSchema)
  declare maXuong: string

  @Column({ type: STRING(50), field: 'MaHang' })
  @ForeignKey(() => MaHangSchema)
  declare maHang: string

  @Column({ type: STRING(500), field: 'TinhTrang' })
  declare tinhTrang: string

  @Column({ type: STRING(500), field: 'NoiDungThucHien' })
  declare noiDungThucHien: string

  @Column({ type: STRING(50), field: 'MaLoi' })
  declare maLoi: string

  @Column({ type: STRING(500), field: 'KetQua' })
  declare ketQua: string

  @Column({ type: INTEGER, field: 'Status' })
  declare status: number

  @Column({ type: STRING(500), field: 'GhiChu' })
  declare ghiChu: string

  @Column({ type: STRING(50), field: 'MaMay' })
  declare maMay: string

  @Column({ type: STRING(500), field: 'XuLy' })
  declare xuLy: string

  @Column({ type: STRING(50), field: 'SoCD' })
  declare soCD: string

  @Column({ type: DATE, field: 'BatDau' })
  declare batDau: string

  @Column({ type: DATE, field: 'KetThuc' })
  declare ketThuc: string

  @Column({ type: DATE, field: 'UpdateTime' })
  declare updateTime: string

  @Column({ type: STRING(50), field: 'NguoiXacNhan' })
  declare nguoiXacNhan: string

  @Column({ type: INTEGER, field: 'SL' })
  declare sl: number

  @Column({ type: INTEGER, field: 'SLKiemTra' })
  declare slKiemTra: string

  @Column({ type: STRING(500), field: 'NguyenNhanLoiMay' })
  declare nguyenNhanLoiMay: string

  @Column({ type: STRING(500), field: 'RePlace' })
  declare replace: string

  @Column({ type: INTEGER, field: 'STTXuLy' })
  declare sttXuLy: number

  @Column({ type: STRING(500), field: 'MoTaLoi' })
  declare moTaLoi: string
}
