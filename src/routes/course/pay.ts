import * as express from 'express'
import db from '~/db'

const router = express.Router()

router.get('/', (req, res) => {
  res.render('course/pay', { title: 'Pay Fee' })
})

export default router
