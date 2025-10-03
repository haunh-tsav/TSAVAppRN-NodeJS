import SoMaySchema, { SoMay } from '@/api/schemas/SoMay.schema'
import { RequestBodyType } from '@/type'
import { dynamicQuery } from '../helpers/query'

const NAMESPACE = 'services/so-may'

export const createNewItem = async (item: SoMay) => {
  try {
    const itemFound = await SoMaySchema.findByPk(item.soMay)
    if (itemFound) throw new Error('Item already exist!')
    const itemCreated = await SoMaySchema.create(item)
    return itemCreated
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Get by id
export const getItemByPk = async (soMay: string) => {
  try {
    const itemFound = await SoMaySchema.findByPk(soMay)
    if (!itemFound) throw new Error(`Item not found!`)
    return itemFound
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Get all
export const getItems = async (body: RequestBodyType) => {
  const sortingColumn = body.sorting.column !== '' ? body.sorting.column : 'soMay'
  const sortingDirection = body.sorting.direction || 'asc'

  try {
    const items = await SoMaySchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[sortingColumn, sortingDirection]],
      where: dynamicQuery<SoMay>(body)
    })
    return items
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Update
export const updateItemByPk = async (soMay: string, itemToUpdate: SoMay) => {
  try {
    const itemFound = await SoMaySchema.findByPk(soMay)
    if (!itemFound) throw new Error(`Item not found!`)
    const updatedItem = await itemFound.update(itemToUpdate)
    return updatedItem
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Delete
export const deleteItemByPk = async (soMay: string) => {
  try {
    const itemFound = await SoMaySchema.findOne({ where: { soMay } })
    if (!itemFound) throw new Error(`Item not found!`)
    await itemFound.destroy()
    return { message: 'Deleted successfully!' }
  } catch (error: any) {
    throw `${error.message}`
  }
}
