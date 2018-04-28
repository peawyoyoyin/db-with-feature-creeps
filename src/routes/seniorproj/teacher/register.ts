import * as express from 'express'
import db from '~/db'
import * as check from '../checkexist'

const router = express.Router()

router.get('/', async (req: any, res) => {
  let years = await check.getYear()
  years = years.map(i => i.year)
  let id = req.user.teacherID

  res.render('seniorproj/teacher/register', {
    title: 'Register Senior Project',
    years,
    result: [],
    errors: [],
    id
  })
})

router.post('/', async (req: any, res) => {
  let { tid, year, topic} = req.body
  let err = []
  tid = req.user.teacherID
  let years = await check.getYear()
  years = years.map(i => i.year)
  try {
    if(tid == undefined && tid == '') err.push("Please insert sid")
    if(year == undefined && year == '') err.push("Please insert year")
    if(topic == undefined && topic == '') err.push("Please insert topic")
    if (err.length !== 0) throw err

    let validate = [
    await check.yearExists(year),
    await check.tidExists(tid),
    ]
    await Promise.all(validate)

    let id = await check.insertTeacherProject(topic,year,tid)

    res.render('seniorproj/teacher/register', {
      title: 'Register Senior Project',
      years,
      result: [`Your project ID is ${id}`],
      errors: []
    })
  } catch (errors) {
    res.render('seniorproj/teacher/register', {
      title: 'Register Senior Project',
      years,
      result: [],
      errors
    })
  }
})

export default router
