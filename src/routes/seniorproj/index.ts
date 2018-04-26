import * as express from 'express'
import db from '~/db'
import { SeniorProject } from '~/entity/senior-project'
import browse from './browse'
import register from './register'
import update from './update'

const router = express.Router()

router.use('/browse', browse)

router.use('/register', register)

router.use('/update', update)

export default router
