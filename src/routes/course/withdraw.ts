import * as express from 'express'

const router = express.Router()

router.get('/',(req,res) => {
  res.render('course/withdraw')
})

export default router