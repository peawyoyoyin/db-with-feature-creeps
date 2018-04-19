import * as express from 'express'
import db from '~/db'
import { SeniorProject } from '~/entity/senior-project'

const router = express.Router()

router.get('/browse', async (req, res) => {
  const result = await db._connection.manager.query("SELECT * FROM registration.senior_project;")
  console.log(result)
  const { projectID, topic, year, superVisorTeacherID } = req.query
  let searchProjectID = projectID
  let searchTopic = topic
  let searchYear = year
  let searchSuperVisorTeacherID = superVisorTeacherID
  res.render('seniorproj/browse', {
    title: 'Browse Senior Projects',
    searchProjectID: searchProjectID,
    searchTopic: searchTopic,
    searchYear: searchYear,
    years: [2558, 2559, 2560],
    searchSuperVisorTeacherID: searchSuperVisorTeacherID
  })
})

router.get('/register', (req, res) => {
  res.render('seniorproj/register', { title: 'Register Senior Project' })
})

router.get('/update', (req, res) => {
  res.render('seniorproj/update', {
    title: 'Update Senior Project Status',
    grades: ["A", "B+", "B", "C+", "C", "D+", "D", "F"],
    types: ["mid-term presentation", "final presentation", "minor update"]
  })
})


export default router
