import * as express from 'express'

const router = express.Router()

router.get('/browse', (req, res) => {
  res.render('seniorproj/browse', { title: 'Browse Senior Projects' })
})

router.get('/register', (req, res) => {
  res.render('seniorproj/register', { title: 'Register Senior Project' })
})

router.get('/update', (req, res) => {
  res.render('seniorproj/update', { title: 'Update Senior Project Status' })
})


export default router
