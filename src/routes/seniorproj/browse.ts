import * as express from 'express'
import db from '~/db'

const router = express.Router()

router.get('/', async (req: any, res) => {
  let { projectID, topic, year, superVisorName, sid } = req.query
  if (!projectID) projectID = ''
  if (!topic) topic = ''
  if (!year) year = ''
  if (!superVisorName) superVisorName = ''
  if (!sid) sid = ''
  const data = await db._connection.manager.query(
    `
    SELECT seniorProj.projectID, seniorProj.topic, seniorProj.yearYear AS year, t.abbrName,s.studentID FROM senior_project seniorProj
    LEFT JOIN student s ON s.seniorProjectProjectID = seniorProj.projectID
    LEFT JOIN teacher t ON t.teacherID = seniorProj.supervisorTeacherID
    WHERE seniorProj.projectID LIKE ? AND
    seniorProj.topic LIKE ? AND
    seniorProj.yearYear LIKE ? AND
    IFNULL(t.abbrName,1) LIKE ? AND
    IFNULL(s.studentID,1) LIKE ?
  `,
    [`${projectID}%`, `${topic}%`, `${year}%`, `${superVisorName}%`,`${sid}%`]
  )
  let years = await db._connection.manager.query(`
    SELECT DISTINCT yearYear AS year
    FROM senior_project
  `)
  years = years.map(year => year.year)
  console.log(data)
  const {renderOptions} = req
  res.render('seniorproj/browse', {
    title: 'Browse Senior Projects',
    projectID: projectID,
    topic: topic,
    year: year,
    years: years,
    superVisorName: superVisorName,
    sid,
    data: data,
    ...renderOptions
  })
})

export default router
