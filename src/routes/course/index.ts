import * as express from 'express'
import manage from './manage'
import enroll from './enroll'
import search from './search'
import detail from './detail'
import db from '~/db'
import { AdvancedConsoleLogger } from 'typeorm'

const router = express.Router()

router.use('/enroll', enroll)
router.use('/manage', manage)
router.use('/search', search)
router.use('/detail', detail)

router.get('/pay', (req, res) => {
  res.render('course/pay', { title: 'Pay Fee' })
})

export default router
