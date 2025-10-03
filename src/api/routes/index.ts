import { authentication } from '@/api/middleware/auth.middleware'
import boPhanRoute from '@/api/routes/BoPhan.route'
import hangMucRoute from '@/api/routes/HangMuc.route'
import maHangRoute from '@/api/routes/MaHang.route'
import maXuongRoute from '@/api/routes/MaXuong.route'
import nguoiDungRoute from '@/api/routes/NguoiDung.route'
import nhanVienRoute from '@/api/routes/NhanVien.route'
import soMayRoute from '@/api/routes/SoMay.route'
import suaChuaRoute from '@/api/routes/SuaChua.route'
import { Router } from 'express'

const router = Router()

router.use('/hang-muc', authentication, hangMucRoute)
router.use('/ma-xuong', authentication, maXuongRoute)
router.use('/bo-phan', authentication, boPhanRoute)
router.use('/nhan-vien', authentication, nhanVienRoute)
router.use('/nguoi-dung', authentication, nguoiDungRoute)
router.use('/so-may', authentication, soMayRoute)
router.use('/ma-hang', authentication, maHangRoute)
router.use('/sua-chua', authentication, suaChuaRoute)
// router.use('/auth', authRoute)
// router.use('/users', userRoute)
// router.use('/roles', roleRoute)
// router.use('/user-roles', userRoleRoute)
// router.use('/colors', colorRoute)
// router.use('/groups', groupRoute)
// router.use('/prints', printRoute)
// router.use('/products', productRoute)
// router.use('/sample-sewings', sampleSewingRoute)
// router.use('/sewing-lines', sewingLineRoute)
// router.use('/importations', importationRoute)
// router.use('/product-groups', productGroupRoute)
// router.use('/product-colors', productColorRoute)
// router.use('/accessory-notes', accessoryNoteRoute)
// router.use('/printable-places', printablePlaceRoute)
// router.use('/garment-accessories', garmentAccessoryRoute)
// router.use('/sewing-line-deliveries', sewingLineDeliveryRoute)
// router.use('/garment-accessory-notes', garmentAccessoryNoteRoute)
// router.use('/cutting-groups', cuttingGroupRoute)
// router.use('/completions', completionRoute)

export default router
