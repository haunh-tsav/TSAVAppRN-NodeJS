import { authentication } from '@/api/middleware/auth.middleware'
import hangMucRoute from '@/api/routes/HangMuc.route'
import { Router } from 'express'

const router = Router()

router.use('/hang-muc', authentication, hangMucRoute)
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
