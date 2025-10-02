import { NhanVien } from '@/api/schemas/NhanVien.schema'
import * as service from '@/api/services/NhanVien.service'
import { RequestBodyType } from '@/type'
import { NextFunction, Request, Response } from 'express'

const NAMESPACE = 'controllers/nhan-vien'

export const createNewItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dataRequest: NhanVien = {
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
    const maNV = String(req.params.maNV)
    const itemFound = await service.getItemByPk(maNV)
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
      filter: { field: 'maNV', items: [-1] }
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
    const maNV = String(req.params.maNV)
    const itemToUpdate: NhanVien = {
      ...req.body
    }
    const itemUpdated = await service.updateItemByPk(maNV, itemToUpdate)
    return res.formatter.ok({ message: 'Item updated successfully!', data: itemUpdated })
  } catch (error: any) {
    return res.formatter.badRequest({ message: error })
  }
}

export const deleteItemByPk = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const maNV = String(req.params.maNV)
    const destroyed = await service.deleteItemByPk(maNV)
    return res.formatter.ok({ message: destroyed.message })
  } catch (error: any) {
    return res.formatter.badRequest({ message: error })
  }
}
