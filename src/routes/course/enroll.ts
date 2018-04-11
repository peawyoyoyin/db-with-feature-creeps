import * as express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.render('course/enroll', { title: 'Enroll Course' })
})

router.post('/', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})

export default router
