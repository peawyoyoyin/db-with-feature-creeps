import * as express from 'express'
import db from '~/db'
import browse from './browse'
import register from './register'
import update from './update'
import view from './view'

const router = express.Router()

router.use('/browse', browse)

router.use('/register', register)

router.use('/update', update)

router.use('/view', view)

export default router
