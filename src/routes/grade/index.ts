import * as express from 'express'
import db from '~/db'

const router = express.Router()

router.get('/', (req, res) => {
  let gradeData
  const { sid } = req.query
  res.render('grade/grade', { gradeData })
})

export default router