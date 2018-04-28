import * as express from 'express'
import db from '~/db'
import browse from './browse'
import update from './update'
import view from './view'
import studentRegister from './student/register'
import studentExistRegister from './student/exist-register'
import teacherRegister from './teacher/register'
import teacherExistRegister from './teacher/exist-register'

const router1 = express.Router()

router1.use('/browse', browse)

router1.use('/register', studentRegister)

router1.use('/view', view)

router1.use('/exist-register', studentExistRegister)

export const studentSenior = router1

const router2 = express.Router()

router2.get('/', (req, res) => {
  res.send('hello')
})
router2.use('/browse', browse)

router2.use('/register', teacherRegister)

router2.use('/exist-register', teacherExistRegister)

router2.use('/update', update)


export const teacherSenior = router2
