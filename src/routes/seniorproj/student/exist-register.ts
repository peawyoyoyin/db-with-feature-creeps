import * as express from 'express'
import db from '~/db'
import * as check from '../checkexist'

const router = express.Router()

router.get('/', async (req: any, res) => {
  let id = req.user.studentID
  const { renderOptions } = req
  res.render('seniorproj/student/exist-register', {
    title: 'Register Senior Project',
    result: [],
    errors: [],
    id,
    ...renderOptions
  })
})

router.post('/', async (req: any, res) => {
  let { sid, projectID } = req.body
  let err = []
  sid = req.user.studentID
  const { renderOptions } = req
  try {
    if (sid == undefined && sid == '') err.push('Please insert sid')
    if (err.length !== 0) throw err

    let validate = [
      await check.sidExists(sid),
      await check.projectExists(projectID),
      await check.studentRegisted(sid)
    ]

    await Promise.all(validate)
    await check.updateStudentProject(projectID, sid)

    res.render('seniorproj/student/exist-register', {
      title: 'Register Senior Project',
      result: [`Your project ID is ${projectID}`],
      errors: [],
      ...renderOptions
    })
  } catch (errors) {
    res.render('seniorproj/student/exist-register', {
      title: 'Register Senior Project',
      result: [],
      errors,
      ...renderOptions
    })
  }
})

export default router
