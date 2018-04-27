import * as express from 'express'
import * as passport from 'passport'

const router = express.Router()

router.get('/', (req: any, res) => {
  req.logout()
  res.redirect('/login')
})

export default router
