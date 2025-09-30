import HangMucSchema, { HangMuc } from '@/api/models/hang_muc.model'
import { RequestBodyType } from '@/type'
import { dynamicQuery } from '../helpers/query'

const NAMESPACE = 'services/completion'

export const createNewItem = async (item: HangMuc) => {
  try {
    const newItem = await HangMucSchema.create(item)
    return newItem
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Get by id
export const getItemByPk = async (maHangMuc: string) => {
  try {
    const itemFound = await HangMucSchema.findByPk(maHangMuc)
    if (!itemFound) throw new Error(`Item not found`)
    return itemFound
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Get all
export const getItems = async (body: RequestBodyType) => {
  try {
    const items = await HangMucSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: dynamicQuery<HangMuc>(body)
    })
    return items
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Update
export const updateItemByPk = async (maHangMuc: string, itemToUpdate: HangMuc) => {
  try {
    const itemFound = await HangMucSchema.findByPk(maHangMuc)
    if (!itemFound) throw new Error(`Item not found`)
    await itemFound.update(itemToUpdate)
    const updatedItem = await HangMucSchema.findByPk(itemFound.id)
    return updatedItem
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Delete
export const deleteItemByPk = async (maHangMuc: string) => {
  try {
    const itemFound = await HangMucSchema.findByPk(maHangMuc)
    if (!itemFound) throw new Error(`Hang Muc not found`)
    await itemFound.destroy()
    return { message: 'Deleted successfully' }
  } catch (error: any) {
    throw `${error.message}`
  }
}
