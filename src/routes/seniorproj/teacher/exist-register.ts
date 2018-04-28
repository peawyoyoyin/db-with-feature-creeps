import * as express from 'express'
import db from '~/db'
import * as check from '../checkexist'

const router = express.Router()

router.get('/', async (req: any, res) => {
  let id = req.user.teacherID
  const {renderOptions} = req
  res.render('seniorproj/teacher/exist-register', {
    title: 'Register Senior Project',
    result: [],
    errors: [],
    id,
    ...renderOptions
  })
})

router.post('/', async (req: any, res) => {
  let { tid,projectID } = req.body
  let err = []
  tid = req.user.teacherID
  try {
    if(tid == undefined && tid == '') err.push("Please insert tid")
    if (err.length !== 0) throw err
    
    let validate = [
      await check.tidExists(tid),
      await check.projectHaveTeacher(projectID)
    ]

    await Promise.all(validate)
    await check.updateTeacherProject(projectID,tid)
    
    res.render('seniorproj/teacher/exist-register', {
      title: 'Register Senior Project',
      result: [`Your project ID is ${projectID}`],
      errors: []
    })
  } catch (errors) {
    res.render('seniorproj/teacher/exist-register', {
      title: 'Register Senior Project',
      result: [],
      errors
    })
  }
})

export default router
