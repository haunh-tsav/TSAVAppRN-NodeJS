import * as controller from '@/api/controllers/HangMuc.controller'
import validationRules from '@/middleware/request-validator'
import { Router } from 'express'
import { authentication } from '../middleware/auth.middleware'

const router = Router()

router.post(
  '/',
  validationRules([
    { field: 'maHangMuc', type: 'string', location: 'body' },
    { field: 'tenHangMuc', type: 'string', location: 'body' }
  ]),
  controller.createNewItem
)

// Get one item
router.get(
  '/find/:maHangMuc',
  validationRules([{ field: 'maHangMuc', type: 'string', location: 'params' }]),
  controller.getItemByPk
)

// Get all items
router.post(
  '/find',
  validationRules([
    { field: 'filter', type: 'object', location: 'body' },
    { field: 'paginator', type: 'object', location: 'body' },
    { field: 'search', type: 'object', location: 'body' },
    { field: 'sorting', type: 'object', location: 'body' }
  ]),
  controller.getItems
)

// Update item (Fields)
router.patch(
  '/find/:maHangMuc',
  validationRules([{ field: 'maHangMuc', type: 'string', location: 'params' }]),
  controller.updateItemByPk
)

// Delete item
router.delete(
  '/:maHangMuc',
  validationRules([{ field: 'maHangMuc', type: 'string', location: 'params' }]),
  controller.deleteItemByPk
)

export default router
