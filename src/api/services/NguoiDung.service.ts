import NguoiDungSchema, { NguoiDung } from '@/api/schemas/NguoiDung.schema'
import { RequestBodyType } from '@/type'
import { dynamicQuery } from '../helpers/query'

const NAMESPACE = 'services/nguoi-dung'

// Get by id
export const getItemByPk = async (maNV: string) => {
  try {
    const itemFound = await NguoiDungSchema.findByPk(maNV)
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
export const updateItemByPk = async (maNV: string, itemToUpdate: NguoiDung) => {
  try {
    const itemFound = await NguoiDungSchema.findByPk(maNV)
    if (!itemFound) throw new Error(`Item not found!`)
    const updatedItem = await itemFound.update(itemToUpdate)
    return updatedItem
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Delete
export const deleteItemByPk = async (maNV: string) => {
  try {
    const itemFound = await NguoiDungSchema.findOne({ where: { maNV } })
    if (!itemFound) throw new Error(`Item not found!`)
    await itemFound.destroy()
    return { message: 'Deleted successfully!' }
  } catch (error: any) {
    throw `${error.message}`
  }
}
