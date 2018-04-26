import * as express from 'express'
import db from '~/db'

const router = express.Router()

router.get('/', async (req, res) => {
  res.render('seniorproj/view', {
  })
})

export default router