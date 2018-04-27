import * as express from 'express'
import db from '~/db'

const router = express.Router()

router.get('/', async (req, res) => {
  let { projectID, topic, year, superVisorTeacherID } = req.query
  if (!projectID) projectID = ''
  if (!topic) topic = ''
  if (!year) year = ''
  if (!superVisorTeacherID) superVisorTeacherID = ''
  const data = await db._connection.manager.query(
    `
    SELECT projectID, topic, yearYear AS year, supervisorTeacherID FROM senior_project seniorProj
    WHERE seniorProj.projectID LIKE ? AND
    seniorProj.topic LIKE ? AND
    seniorProj.yearYear LIKE ? AND
    IFNULL(seniorProj.supervisorTeacherID,1) LIKE ?
  `,
    [`${projectID}%`, `${topic}%`, `${year}%`, `${superVisorTeacherID}%`]
  )
  let years = await db._connection.manager.query(`
    SELECT DISTINCT yearYear AS year
    FROM senior_project
  `)
  years = years.map(year => year.year)
  console.log(data)
  res.render('seniorproj/browse', {
    title: 'Browse Senior Projects',
    projectID: projectID,
    topic: topic,
    year: year,
    years: years,
    superVisorTeacherID: superVisorTeacherID,
    data: data
  })
})

export default router
