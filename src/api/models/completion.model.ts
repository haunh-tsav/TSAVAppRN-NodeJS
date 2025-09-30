import { ItemStatusType } from '@/type'
import { DataTypes } from 'sequelize'
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import ProductSchema from './product.model'

const { INTEGER, STRING, BOOLEAN, FLOAT, DATE } = DataTypes

export type Completion = {
  id: number
  productID: number
  quantityIroned?: number | null
  quantityCheckPassed?: number | null
  quantityPackaged?: number | null
  exportedDate?: string | null
  passFIDate?: string | null
  status?: ItemStatusType
}

@Table({
  modelName: 'Completion',
  tableName: 'completions',
  timestamps: true
})
export default class CompletionSchema extends Model<Completion> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'id' })
  declare id: number

  @Column({ type: INTEGER, field: 'product_id' })
  @ForeignKey(() => ProductSchema)
  declare productID: number

  @Column({ type: FLOAT, field: 'quantity_ironed' })
  declare quantityIroned: number

  @Column({ type: FLOAT, field: 'quantity_check_passed' })
  declare quantityCheckPassed: string

  @Column({ type: FLOAT, field: 'quantity_packaged' })
  declare quantityPackaged: string

  @Column({ type: STRING, field: 'exported_date' })
  declare exportedDate: string

  @Column({ type: STRING, field: 'pass_fi_date' })
  declare passFIDate: string

  @Column({ type: STRING(45), field: 'status' })
  declare status: string

  @BelongsTo(() => ProductSchema)
  declare product: ProductSchema
}
