import * as express from 'express'
import * as passport from 'passport'

const router = express.Router()

router.get('/', (req: any, res) => {
  res.render('login/login', {title: 'Login', message: req.flash(), sidebarVariation: 'login'})
})
router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/student',
    failureRedirect: '/login',
    failureFlash: true
  })
)

export default router
