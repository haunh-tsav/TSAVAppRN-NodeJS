import * as controller from '@/api/controllers/NhanVien.controller'
import validationRules from '@/middleware/request-validator'
import { Router } from 'express'
import { authentication } from '../middleware/auth.middleware'

const router = Router()

router.post(
  '/',
  validationRules([
    { field: 'maNV', type: 'string', location: 'body' },
    { field: 'hoTen', type: 'string', location: 'body' },
    { field: 'maBP', type: 'string', location: 'body' }
  ]),
  controller.createNewItem
)

// Get one item
router.get(
  '/find/:maNV',
  validationRules([{ field: 'maNV', type: 'string', location: 'params' }]),
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
  '/find/:maNV',
  validationRules([{ field: 'maNV', type: 'string', location: 'params' }]),
  controller.updateItemByPk
)

// Delete item
router.delete(
  '/:maNV',
  validationRules([{ field: 'maNV', type: 'string', location: 'params' }]),
  controller.deleteItemByPk
)

export default router
