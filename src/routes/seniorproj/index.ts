import * as express from 'express'
import db from '~/db'
import browse from './browse'
import register from './register'
import update from './update'
import view from './view'
import existRegister from './exist-register'

const router1 = express.Router()

router1.use('/browse', browse)

router1.use('/register', register)

router1.use('/view', view)

router1.use('/exist-register',existRegister)

export const studentSenior = router1

const router2 = express.Router()

router2.use('/browse', browse)

router2.use('/register', register)

router2.use('/view', view)

router2.use('/exist-register',existRegister)

export const teacherSenior = router2