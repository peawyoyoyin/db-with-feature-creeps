import * as express from 'express'
import * as passport from 'passport'

const router = express.Router()

router.get('/', (req, res) => {
  res.render('login/login')
})
router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)

export default router
