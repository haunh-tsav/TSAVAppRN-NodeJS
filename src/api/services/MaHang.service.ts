import MaHangSchema, { MaHang } from '@/api/schemas/MaHang.schema'
import { RequestBodyType } from '@/type'
import { dynamicQuery } from '../helpers/query'

const NAMESPACE = 'services/ma-hang'

export const createNewItem = async (item: MaHang) => {
  try {
    const itemFound = await MaHangSchema.findOne({ where: { maHang: item.maHang } })
    if (itemFound) throw new Error('Item already exist!')
    const itemCreated = await MaHangSchema.create(item)
    return itemCreated
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Get by id
export const getItemByPk = async (maHang: string) => {
  try {
    const itemFound = await MaHangSchema.findByPk(maHang)
    if (!itemFound) throw new Error(`Item not found!`)
    return itemFound
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Get all
export const getItems = async (body: RequestBodyType) => {
  const sortingColumn = body.sorting.column !== '' ? body.sorting.column : 'stt'
  const sortingDirection = body.sorting.direction || 'asc'

  try {
    const items = await MaHangSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[sortingColumn, sortingDirection]],
      where: dynamicQuery<MaHang>(body)
    })
    return items
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Update
export const updateItemByPk = async (maHang: string, itemToUpdate: MaHang) => {
  try {
    const itemFound = await MaHangSchema.findByPk(maHang)
    if (!itemFound) throw new Error(`Item not found!`)
    const updatedItem = await itemFound.update(itemToUpdate)
    return updatedItem
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Delete
export const deleteItemByPk = async (maHang: string) => {
  try {
    const itemFound = await MaHangSchema.findOne({ where: { maHang } })
    if (!itemFound) throw new Error(`Item not found!`)
    await itemFound.destroy()
    return { message: 'Deleted successfully!' }
  } catch (error: any) {
    throw `${error.message}`
  }
}
