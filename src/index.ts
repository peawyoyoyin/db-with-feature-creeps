import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as morgan from 'morgan'
import config from './config'
import { Connection, createConnection } from 'typeorm'
//this fixes path aliases
import 'module-alias/register'

import course from './routes/course'
import seniorProject from './routes/seniorproj'
import db from './db'

import { Student } from './entity/student'

(async () => {
  await db.init(config.orm)
  await db.student.insert({
    studentID: '610123421',
    firstName: 'John',
    lastName: 'Slow',
    nationality: 'TH',
    year: 2561,
    citizenID: '0123456789012'
  })
  console.log('inserted student')
})()

const app = express()
app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/static', express.static('public'))
app.use(morgan(':status :method\t:url'))

app.use('/course', course)
app.use('/seniorproj', seniorProject)

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

app.post('/newstudent', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})

app.get('/', (req, res) => {
  res.render('index', { title: 'DB WITH FEATURE CREEPS' })
})

app.listen(config.express.port, () => {
  console.log(`listening on port ${config.express.port}`)
})
