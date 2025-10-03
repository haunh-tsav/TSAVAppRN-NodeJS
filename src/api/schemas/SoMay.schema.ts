import { DataTypes } from 'sequelize'
import { Column, Model, Table } from 'sequelize-typescript'

const { STRING } = DataTypes

export type SoMay = {
  soMay: string
}

@Table({
  modelName: 'SoMay',
  tableName: 'SoMay',
  timestamps: false // Required to set "false"
})
export default class SoMaySchema extends Model<SoMay> {
  @Column({ type: STRING(50), primaryKey: true, field: 'SoMay', unique: true })
  declare soMay: string
}
