import { HangMuc } from '@/api/schemas/HangMuc.schema'
import * as service from '@/api/services/HangMuc.service'
import { RequestBodyType } from '@/type'
import { NextFunction, Request, Response } from 'express'

const NAMESPACE = 'controllers/hang-muc'

export const createNewItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dataRequest: HangMuc = {
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
    const maHangMuc = String(req.params.maHangMuc)
    const itemFound = await service.getItemByPk(maHangMuc)
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
      filter: { field: 'maHangMuc', items: [-1] }
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
    const maHangMuc = String(req.params.maHangMuc)
    const itemToUpdate: HangMuc = {
      ...req.body
    }
    const itemUpdated = await service.updateItemByPk(maHangMuc, itemToUpdate)
    return res.formatter.ok({ message: 'Item updated successfully!', data: itemUpdated })
  } catch (error: any) {
    return res.formatter.badRequest({ message: error })
  }
}

export const deleteItemByPk = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const maHangMuc = String(req.params.maHangMuc)
    const destroyed = await service.deleteItemByPk(maHangMuc)
    return res.formatter.ok({ message: destroyed.message })
  } catch (error: any) {
    return res.formatter.badRequest({ message: error })
  }
}
