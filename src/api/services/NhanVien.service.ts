import NhanVienSchema, { NhanVien } from '@/api/schemas/NhanVien.schema'
import { RequestBodyType } from '@/type'
import { dynamicQuery } from '../helpers/query'

const NAMESPACE = 'services/nhan-vien'

export const createNewItem = async (item: NhanVien) => {
  try {
    const itemFound = await NhanVienSchema.findOne({ where: { maNV: item.maNV } })
    if (itemFound) throw new Error('Item already exist!')
    const itemCreated = await NhanVienSchema.create(item)
    return itemCreated
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Get by id
export const getItemByPk = async (maNV: string) => {
  try {
    const itemFound = await NhanVienSchema.findByPk(maNV)
    if (!itemFound) throw new Error(`Item not found!`)
    return itemFound
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Get all
export const getItems = async (body: RequestBodyType) => {
  const sortingColumn = body.sorting.column !== '' ? body.sorting.column : 'maNV'
  const sortingDirection = body.sorting.direction || 'asc'

  try {
    const items = await NhanVienSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[sortingColumn, sortingDirection]],
      where: dynamicQuery<NhanVien>(body)
    })
    return items
  } catch (error: any) {
    throw `${error.message}`
  }
}

// Update
export const updateItemByPk = async (maNV: string, itemToUpdate: NhanVien) => {
  try {
    const itemFound = await NhanVienSchema.findByPk(maNV)
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
    const itemFound = await NhanVienSchema.findOne({ where: { maNV } })
    if (!itemFound) throw new Error(`Item not found!`)
    await itemFound.destroy()
    return { message: 'Deleted successfully!' }
  } catch (error: any) {
    throw `${error.message}`
  }
}
