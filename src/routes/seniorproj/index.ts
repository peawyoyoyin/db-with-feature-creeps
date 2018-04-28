import * as express from 'express'
import db from '~/db'
import browse from './browse'
import update from './update'
import view from './view'
import student from './student'
import teacher from './teacher'

const router = express.Router()

router.use('/browse', browse)

router.use('/update', update)

router.use('/view', view)

router.use('/student',student)

router.use('/teacher',teacher)

export default router
