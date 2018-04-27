import * as express from 'express'
import * as passport from 'passport'

const router = express.Router()

router.get('/', (req: any, res) => {
  res.render('login/login', {message: req.flash()})
})
router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
)

export default router
