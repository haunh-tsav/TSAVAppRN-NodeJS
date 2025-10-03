import * as controller from '@/api/controllers/NguoiDung.controller'
import validationRules from '@/middleware/request-validator'
import { Router } from 'express'

const router = Router()

router.post(
  '/',
  validationRules([
    { field: 'tenDangNhap', type: 'string', location: 'body' },
    { field: 'matKhau', type: 'string', location: 'body' },
    { field: 'maNV', type: 'string', location: 'body' },
    { field: 'quanTri', type: 'boolean', location: 'body' },
    { field: 'maBP', type: 'string', location: 'body' },
    { field: 'maXuong', type: 'string', location: 'body' }
  ]),
  controller.createNewItem
)

// Get one item
router.get(
  '/find/:tenDangNhap',
  validationRules([{ field: 'tenDangNhap', type: 'string', location: 'params' }]),
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
  '/find/:tenDangNhap',
  validationRules([{ field: 'tenDangNhap', type: 'string', location: 'params' }]),
  controller.updateItemByPk
)

// Delete item
router.delete(
  '/find/:tenDangNhap',
  validationRules([{ field: 'tenDangNhap', type: 'string', location: 'params' }]),
  controller.deleteItemByPk
)

export default router
