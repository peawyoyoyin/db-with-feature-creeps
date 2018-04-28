import * as express from 'express'
import db from '~/db'
import * as check from '../checkexist'
import * as passport from 'passport'

const router = express.Router()

router.get('/', async (req: any, res) => {
  let years = await check.getYear()
  years = years.map(i => i.year)
  let id = req.user.studentID

  res.render('seniorproj/student/register', {
    title: 'Register Senior Project',
    years,
    result: [],
    errors: [],
    id
  })
})

router.post('/', async (req: any, res) => {
  let { sid, year, topic} = req.body
  let err = []
  sid = req.user.studentID
  let years = await check.getYear()
  years = years.map(i => i.year)
  try {
    if(sid == undefined && sid == '') err.push("Please insert sid")
    if(year == undefined && year == '') err.push("Please insert year")
    if(topic == undefined && topic == '') err.push("Please insert topic")
    if (err.length !== 0) throw err

    let validate = [
    await check.yearExists(year),
    await check.sidExists(sid),
    await check.studentRegisted(sid)
    ]
    await Promise.all(validate)

    let id = await check.insertProject(topic,year)
    await check.updateStudentProject(id,sid)

    res.render('seniorproj/student/register', {
      title: 'Register Senior Project',
      years,
      result: [`Your project ID is ${id}`],
      errors: []
    })
  } catch (errors) {
    res.render('seniorproj/student/register', {
      title: 'Register Senior Project',
      years,
      result: [],
      errors
    })
  }
})

export default router
