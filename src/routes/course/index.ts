import * as express from 'express'
import manage from './manage'
import enroll from './enroll'
import search from './search'
import detail from './detail'
import pay from './pay'
import withdraw from './withdraw'
import db from '~/db'
import { AdvancedConsoleLogger } from 'typeorm'

const router = express.Router()

router.use('/enroll', enroll)
router.use('/manage', manage)
router.use('/search', search)
router.use('/detail', detail)
router.use('/pay', pay)
router.use('/withdraw',withdraw)

export default router
