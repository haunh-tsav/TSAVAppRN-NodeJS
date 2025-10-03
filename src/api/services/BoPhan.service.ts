import BoPhanSchema, { BoPhan } from '@/api/schemas/BoPhan.schema'
import { RequestBodyType } from '@/type'
import { dynamicQuery } from '../helpers/query'

const NAMESPACE = 'services/bo-phan'

export const createNewItem = async (item: BoPhan) => {
  try {
    const itemFound = await BoPhanSchema.findByPk(item.maBP)
    if (itemFound) throw new Error('Item already exist!')
    const maxStt = await BoPhanSchema.max<number, BoPhanSchema>('stt')
    const nextStt = (maxStt || 0) + 1
    const itemCreated = await BoPhanSchema.create({ ...item, stt: nextStt })
    return itemCreated
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Get by id
export const getItemByPk = async (maBP: string) => {
  try {
    const itemFound = await BoPhanSchema.findByPk(maBP)
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
    const items = await BoPhanSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[sortingColumn, sortingDirection]],
      where: dynamicQuery<BoPhan>(body)
    })
    return items
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Update
export const updateItemByPk = async (maBP: string, itemToUpdate: BoPhan) => {
  try {
    const itemFound = await BoPhanSchema.findByPk(maBP)
    if (!itemFound) throw new Error(`Item not found!`)
    const updatedItem = await itemFound.update(itemToUpdate)
    return updatedItem
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Delete
export const deleteItemByPk = async (maBP: string) => {
  try {
    const itemFound = await BoPhanSchema.findOne({ where: { maBP } })
    if (!itemFound) throw new Error(`Item not found!`)
    await itemFound.destroy()
    return { message: 'Deleted successfully!' }
  } catch (error: any) {
    throw `${error.message}`
  }
}
