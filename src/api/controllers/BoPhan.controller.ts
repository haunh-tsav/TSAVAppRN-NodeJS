import { BoPhan } from '@/api/schemas/BoPhan.schema'
import * as service from '@/api/services/BoPhan.service'
import { RequestBodyType } from '@/type'
import { NextFunction, Request, Response } from 'express'

const NAMESPACE = 'controllers/bo-phan'

export const createNewItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dataRequest: BoPhan = {
      ...req.body
    }
    const newItem = await service.createNewItem({
      ...dataRequest,
      isLine: dataRequest.isLine ? 1 : 0, // Do trên schema là kiểu số
      useBudget: dataRequest.useBudget ? 1 : 0 // Do trên schema là kiểu số
    })
    return res.formatter.created({ data: newItem })
  } catch (error: any) {
    return res.formatter.badRequest({ message: error })
  }
}

export const getItemByPk = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const maBP = String(req.params.maBP)
    const itemFound = await service.getItemByPk(maBP)
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
      filter: { field: 'maBP', items: [-1] }
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
    const maBP = String(req.params.maBP)
    const itemToUpdate: BoPhan = {
      ...req.body
    }
    const itemUpdated = await service.updateItemByPk(maBP, itemToUpdate)
    return res.formatter.ok({ message: 'Item updated successfully!', data: itemUpdated })
  } catch (error: any) {
    return res.formatter.badRequest({ message: error })
  }
}

export const deleteItemByPk = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const maBP = String(req.params.maBP)
    const destroyed = await service.deleteItemByPk(maBP)
    return res.formatter.ok({ message: destroyed.message })
  } catch (error: any) {
    return res.formatter.badRequest({ message: error })
  }
}
