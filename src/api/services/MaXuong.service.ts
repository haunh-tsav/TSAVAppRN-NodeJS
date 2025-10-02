import MaXuongSchema, { MaXuong } from '@/api/schemas/MaXuong.schema'
import { RequestBodyType } from '@/type'
import { dynamicQuery } from '../helpers/query'

const NAMESPACE = 'services/ma-xuong'

export const createNewItem = async (item: MaXuong) => {
  try {
    const itemFound = await MaXuongSchema.findOne({ where: { maXuong: item.maXuong } })
    if (itemFound) throw new Error('Item already exist!')
    const itemCreated = await MaXuongSchema.create(item)
    return itemCreated
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Get by id
export const getItemByPk = async (maXuong: string) => {
  try {
    const itemFound = await MaXuongSchema.findByPk(maXuong)
    if (!itemFound) throw new Error(`Item not found!`)
    return itemFound
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Get all
export const getItems = async (body: RequestBodyType) => {
  const sortingColumn = body.sorting.column !== '' ? body.sorting.column : 'maXuong'
  const sortingDirection = body.sorting.direction || 'asc'

  try {
    const items = await MaXuongSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[sortingColumn, sortingDirection]],
      where: dynamicQuery<MaXuong>(body)
    })
    return items
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Update
export const updateItemByPk = async (maXuong: string, itemToUpdate: MaXuong) => {
  try {
    const itemFound = await MaXuongSchema.findByPk(maXuong)
    if (!itemFound) throw new Error(`Item not found!`)
    const updatedItem = await itemFound.update(itemToUpdate)
    return updatedItem
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Delete
export const deleteItemByPk = async (maXuong: string) => {
  try {
    const itemFound = await MaXuongSchema.findOne({ where: { maXuong } })
    if (!itemFound) throw new Error(`Item not found!`)
    await itemFound.destroy()
    return { message: 'Deleted successfully!' }
  } catch (error: any) {
    throw `${error.message}`
  }
}
