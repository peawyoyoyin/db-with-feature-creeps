import * as bodyParser from 'body-parser'
import * as express from 'express'
import config from './config'
import { Connection, createConnection } from 'typeorm'

import { Student } from './entity/student'

// ;(async () => {
//   const connection: Connection = await createConnection(config.orm)
//   const repo = connection.getRepository(Student)
//   // const test = repo.create({
//     //   studentID: '5834515112',
//     //   firstName: 'John',
//     //   lastName: 'Doe',
//     //   citizenID: '1579900777777',
//     //   year: 2558,
//     //   nationality: 'TH'
//     // })
//     // repo.save(test)
//   })()
  
const app = express()
app.set('view engine', 'pug')
app.use(bodyParser.json())

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { title: 'DB WITH FEATURE CREEPS' })
})

app.get('/newstudent', (req, res) => {
  // query for all departments?
  res.render('new-student', { 
    title: 'Register New Student',
    departments: [
      'Computer Engineering',
      'Chemical Engineering'
    ]
  })
})

app.get('/course/enroll', (req, res) => {
  res.render('course/enroll', { title: 'Enroll Course' })
})

app.get('/course/search', (req, res) => {
  res.render('course/search', { title: 'Search Courses' })
})

app.get('/course/manage', (req, res) => {
  res.render('course/manage', { title: 'Manage Courses' })
})

app.get('/course/pay', (req, res) => {
  res.render('course/pay', { title: 'Pay Fee' })
})

app.get('/seniorproj/browse', (req, res) => {
  res.render('seniorproj/browse', { title: 'Browse Senior Projects' })
})

app.get('/seniorproj/register', (req, res) => {
  res.render('seniorproj/register', { title: 'Register Senior Project' })
})

app.get('/seniorproj/update', (req, res) => {
  res.render('seniorproj/update', { title: 'Update Senior Project Status' })
})

app.listen(config.express.port, () => {
  console.log(`listening on port ${config.express.port}`)
})
