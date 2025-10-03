import * as controller from '@/api/controllers/SuaChua.controller'
import validationRules from '@/middleware/request-validator'
import { Router } from 'express'

const router = Router()

router.post(
  '/',
  validationRules([
    { field: 'nguoiTao', type: 'string', location: 'body' }, // tên đăng nhập của người dùng, vd: trungnv <br>
    { field: 'nguoiThucHien', type: 'string', location: 'body' }, // lấy MaNV, vd: H01075 <br>
    { field: 'maHang', type: 'string', location: 'body' }, // lấy từ MaHang , vd: P700-FOLD <br>
    { field: 'maBP', type: 'string', location: 'body' }, // lấy từ line, vd: HCM2.D3
    { field: 'maXuong', type: 'string', location: 'body' }, // lấy từ line, vd: HCM2 <br>
    { field: 'ngay', type: 'date', location: 'body' }, // Thời gian mở popup thêm mới
    { field: 'soCD', type: 'string', location: 'body' }, // lấy từ MayMoc, vd: 7 <br>
    { field: 'maMay', type: 'string', location: 'body' }, // lấy từ MayMoc, vd: 3909DE55-86FB-415F-A8BD-E08368118B6C <br>
    { field: 'tinhTrang', type: 'string', location: 'body' }, // Table "TinhTrang"
    { field: 'moTaLoi', type: 'string', location: 'body' } // người dùng nhập, vd: lỏng ốc <br>
  ]),
  controller.createNewItem
)

// Get one item
router.get('/find/:id', validationRules([{ field: 'id', type: 'string', location: 'params' }]), controller.getItemByPk)

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
  '/find/:id',
  validationRules([{ field: 'id', type: 'string', location: 'params' }]),
  controller.updateItemByPk
)

// Delete item
router.delete(
  '/find/:id',
  validationRules([{ field: 'id', type: 'string', location: 'params' }]),
  controller.deleteItemByPk
)

export default router
