import * as express from 'express'
import register from './register'
import exist from './exist-register'

const router = express.Router()

router.use('/',register)

router.use('/exist',exist)

export default router