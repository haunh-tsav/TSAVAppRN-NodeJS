import { NextFunction, Request, Response } from 'express'
import { decodeToken, verifyToken } from '../helpers/jsonwebtoken.helper'
import jwt from 'jsonwebtoken'
import appConfig from '@/config/app.config'
import validationRules from './request-validator'

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  // Get the jwt token from the head
  try {
    const authHeader = req.headers['authorization']
    if (!authHeader) throw new Error('Access token not found!')
    const [bearer, accessToken] = authHeader.split(' ')
    if (bearer !== 'Bearer' || !accessToken) throw new Error('Invalid access token format!')
    // Bước tiếp theo là xác thực accessToken có hợp lệ hay không

    // verifyToken(accessToken, 'accessToken', (err, decoded) => {
    //   if (err) {
    //     return res.formatter.badRequest({
    //       data: decoded,
    //       error: { error: err?.name ?? '', errorDetail: err?.message ?? '' }
    //     })
    //   }
    // })
    next()
  } catch (error: any) {
    return res.formatter.unauthorized({ message: `${error.message}` })
  }
}
