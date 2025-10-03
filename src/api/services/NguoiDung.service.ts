import NguoiDungSchema, { NguoiDung } from '@/api/schemas/NguoiDung.schema'
import { RequestBodyType } from '@/type'
import { dynamicQuery } from '../helpers/query'

const NAMESPACE = 'services/nguoi-dung'

export const createNewItem = async (item: NguoiDung) => {
  try {
    const itemFound = await NguoiDungSchema.findOne({ where: { tenDangNhap: item.tenDangNhap } })
    if (itemFound) throw new Error('Item already exist!')
    const itemCreated = await NguoiDungSchema.create(item)
    return itemCreated
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Get by id
export const getItemByPk = async (tenDangNhap: string) => {
  try {
    const itemFound = await NguoiDungSchema.findByPk(tenDangNhap)
    if (!itemFound) throw new Error(`Item not found!`)
    return itemFound
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Get all
export const getItems = async (body: RequestBodyType) => {
  const sortingColumn = body.sorting.column !== '' ? body.sorting.column : 'tenDangNhap'
  const sortingDirection = body.sorting.direction || 'asc'

  try {
    const items = await NguoiDungSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[sortingColumn, sortingDirection]],
      where: dynamicQuery<NguoiDung>(body)
    })
    return items
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Update
export const updateItemByPk = async (tenDangNhap: string, itemToUpdate: NguoiDung) => {
  try {
    const itemFound = await NguoiDungSchema.findByPk(tenDangNhap)
    if (!itemFound) throw new Error(`Item not found!`)
    const updatedItem = await itemFound.update(itemToUpdate)
    return updatedItem
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Delete
export const deleteItemByPk = async (tenDangNhap: string) => {
  try {
    const itemFound = await NguoiDungSchema.findOne({ where: { tenDangNhap } })
    if (!itemFound) throw new Error(`Item not found!`)
    await itemFound.destroy()
    return { message: 'Deleted successfully!' }
  } catch (error: any) {
    throw `${error.message}`
  }
}
