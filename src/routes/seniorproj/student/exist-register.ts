import * as express from 'express'
import db from '~/db'
import * as check from '../checkexist'

const router = express.Router()

router.get('/', async (req: any, res) => {
  let id = req.user.studentID
  res.render('seniorproj/student/exist-register', {
    title: 'Register Senior Project',
    result: [],
    errors: [],
    id
  })
})

router.post('/', async (req, res) => {
  let { sid, projectID } = req.body
  let err = []
  let years = await check.getYear()
  years = years.map(i => i.year)
  try {
    if(sid == undefined && sid == '') err.push("Please insert sid")
    if (err.length !== 0) throw err
    
    err.push(check.sidExists(sid))
    if (err.length !== 0) throw err
    
    check.projectExists(projectID)
    check.updateStudentProject(projectID,sid)
    res.render('seniorproj/student/register', {
      title: 'Register Senior Project',
      years,
      result: [`Your project ID is ${projectID}`],
      errors: []
    })
  } catch (errors) {
    res.render('seniorproj/student/exist-register', {
      title: 'Register Senior Project',
      years,
      result: [],
      errors
    })
  }
})

export default router
