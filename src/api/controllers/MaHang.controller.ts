import { MaHang } from '@/api/schemas/MaHang.schema'
import * as service from '@/api/services/MaHang.service'
import { RequestBodyType } from '@/type'
import { NextFunction, Request, Response } from 'express'

const NAMESPACE = 'controllers/ma-hang'

export const createNewItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dataRequest: MaHang = {
      ...req.body
    }
    const newItem = await service.createNewItem(dataRequest)
    return res.formatter.created({ data: newItem })
  } catch (error: any) {
    return res.formatter.badRequest({ message: error })
  }
}

export const getItemByPk = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const maHang = String(req.params.maHang)
    const itemFound = await service.getItemByPk(maHang)
    return res.formatter.ok({ data: itemFound })
  } catch (error: any) {
    return res.formatter.notFound({ message: error })
  }
}

export const getItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bodyRequest: RequestBodyType = {
      ...req.body
    }
    const items = await service.getItems(bodyRequest)
    const countAll = await service.getItems({
      ...bodyRequest,
      filter: { field: 'maHang', items: [-1] }
    })
    return res.formatter.ok({
      data: items.rows,
      length: items.count,
      page: Number(bodyRequest.paginator.page),
      pageSize: Number(bodyRequest.paginator.pageSize),
      total: bodyRequest.search.term.length > 0 ? items.count : countAll.count
    })
  } catch (error: any) {
    return res.formatter.badRequest({ message: error })
  }
}

export const updateItemByPk = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const maHang = String(req.params.maHang)
    const itemToUpdate: MaHang = {
      ...req.body
    }
    const itemUpdated = await service.updateItemByPk(maHang, itemToUpdate)
    return res.formatter.ok({ message: 'Item updated successfully!', data: itemUpdated })
  } catch (error: any) {
    return res.formatter.badRequest({ message: error })
  }
}

export const deleteItemByPk = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const maHang = String(req.params.maHang)
    const destroyed = await service.deleteItemByPk(maHang)
    return res.formatter.ok({ message: destroyed.message })
  } catch (error: any) {
    return res.formatter.badRequest({ message: error })
  }
}
