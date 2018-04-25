import * as express from 'express'
import db from '~/db'
import { SeniorProject } from '~/entity/senior-project'

const router = express.Router()

router.get('/browse', async (req, res) => {
  let { projectID, topic, year, superVisorTeacherID } = req.query
  if (!projectID) projectID = ''
  if (!topic) topic = ''
  if (!year) year = ''
  if (!superVisorTeacherID) superVisorTeacherID = ''
  const data = await db._connection.manager.query(`
    SELECT * FROM senior_project seniorProj
    WHERE seniorProj.projectID LIKE ? AND
    seniorProj.topic LIKE ? AND
    seniorProj.year LIKE ? AND
    IFNULL(seniorProj.supervisorTeacherID,1) LIKE ?
  `, [`${projectID}%`, `${topic}%`, `${year}%`, `${superVisorTeacherID}%`])
  let years = await db._connection.manager.query(`
    SELECT DISTINCT year
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

router.get('/register', async (req, res) => {
  let years = await db._connection.manager.query(`SELECT DISTINCT year FROM academic_year`)
  years = years.map(i => i.year)
  console.log(years)
  res.render('seniorproj/register', {
    title: 'Register Senior Project',
    years,
    result:[],
    errors:[]
  })
})

router.post('/register', async (req, res) => {
  let { sid, year, topic, supervisorTeacherID,projectID } = req.body
  let err = []
  let years = await db._connection.manager.query(`SELECT DISTINCT year FROM academic_year`)
  years = years.map(i => i.year)  
  try {
    if(year !== undefined){
      let check_year = await db._connection.manager.query(`SELECT EXISTS(
        SELECT 1 FROM academic_year WHERE year=? LIMIT 1)`, [year])
      console.log("check year", check_year)
      for(let i in check_year[0]) {
        if(check_year[0][i] === "0") err.push("You're cheating. There is no year")
      }
    }

    if(supervisorTeacherID !== undefined && supervisorTeacherID !== ''){
      let check_teacher = await db._connection.manager.query(`SELECT EXISTS(
        SELECT 1 FROM teacher WHERE teacherID=? LIMIT 1)`, [supervisorTeacherID])
      console.log("check teacher", check_teacher)
      if(Object.values(check_teacher[0])[0] === "0") err.push("There is no teacher")
    }
    
    if(sid !== undefined && sid !== ''){
      console.log("sid ", sid)
      let check_student = await db._connection.manager.query(`
        SELECT * FROM student WHERE studentID=? LIMIT 1`, [sid])
      console.log(check_student)
      if(check_student.length === 0) err.push("There is no student")
      else {
        check_student = check_student[0]
        if(check_student.seniorProjectProjectID !== null){
          err.push("This student already have a project")
        }
      }
    }

    if(err.length !== 0) throw err

    let id
    let teacher = null
    if(projectID === undefined){
      if(topic === '') throw ["Please fill in Topic field"]
      let insert_project = await db._connection.manager.query(`INSERT INTO senior_project
        (topic,year) VALUES (?,?);
        `, [topic, year])
      let query_id = await db._connection.query(`SELECT LAST_INSERT_ID();`)
      id = Object.values(query_id[0])[0]
    }else {
      let find_project = await db._connection.manager.query(`SELECT 
        supervisorTeacherID FROM senior_project 
        WHERE projectID=? LIMIT 1`,[projectID])
      if(find_project.length === 0) throw ["There is no project"]
      id = projectID
      teacher = find_project[0].supervisorTeacherID
    }

    if(supervisorTeacherID !== undefined && supervisorTeacherID !== ''){
      if(teacher !== null) throw ["This project already has supervisor"]
      await db._connection.manager.query(`UPDATE senior_project 
      SET supervisorTeacherID=?
      WHERE projectID=?
      `,[supervisorTeacherID,id])
    }
    if(sid !== undefined && sid !== ''){
      let insert_student = await db._connection.manager.query(`UPDATE student
      SET seniorProjectProjectID=?
      WHERE studentID=?
      `,[id,sid])
    }
    res.render('seniorproj/register',{
      title: 'Register Senior Project',
      years,
      result:[`Your project ID is ${id}`],
      errors:[]
    })
  } catch (errors) {
    res.render('seniorproj/register', {
      title: 'Register Senior Project',
      years,
      result:[],
      errors
    })
  }
})

router.get('/update', async (req, res) => {
  const rawTypes = await getAllEvaluationType()
  const types = rawTypes.map(type => ({text: type.description, value: type.typeID}))
  res.render('seniorproj/update', {
    title: 'Update Senior Project Status',
    grades: ["A", "B+", "B", "C+", "C", "D+", "D", "F"],
    types
  })
})

router.post('/update', async (req, res) => {
  console.log(req.body)
  await getAllEvaluationType()
  res.redirect('/seniorproj/update')
})

async function getAllEvaluationType() {
  const rawTypes = await db.evaluationType.query(`
    SELECT * FROM evaluation_type
  `)
  return rawTypes
}

export default router
