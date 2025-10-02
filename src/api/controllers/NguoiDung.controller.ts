import { NguoiDung } from '@/api/schemas/NguoiDung.schema'
import * as service from '@/api/services/NguoiDung.service'
import { RequestBodyType } from '@/type'
import { NextFunction, Request, Response } from 'express'

const NAMESPACE = 'controllers/nguoi-dung'

export const getItemByPk = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tenDangNhap = String(req.params.tenDangNhap)
    const itemFound = await service.getItemByPk(tenDangNhap)
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
      filter: { field: 'tenDangNhap', items: [-1] }
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
    const tenDangNhap = String(req.params.tenDangNhap)
    const itemToUpdate: NguoiDung = {
      ...req.body
    }
    const itemUpdated = await service.updateItemByPk(tenDangNhap, itemToUpdate)
    return res.formatter.ok({ message: 'Item updated successfully!', data: itemUpdated })
  } catch (error: any) {
    return res.formatter.badRequest({ message: error })
  }
}

export const deleteItemByPk = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tenDangNhap = String(req.params.tenDangNhap)
    const destroyed = await service.deleteItemByPk(tenDangNhap)
    return res.formatter.ok({ message: destroyed.message })
  } catch (error: any) {
    return res.formatter.badRequest({ message: error })
  }
}
