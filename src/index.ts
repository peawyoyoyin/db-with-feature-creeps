import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as morgan from 'morgan'
import config from './config'
import { Connection, createConnection } from 'typeorm'
//this fixes path aliases
import 'module-alias/register'

import course from './routes/course'
import seniorProject from './routes/seniorproj'
import newStudent from './routes/newstudent'
import db, { seed } from './db'

import { Student } from './entity/student'

(async () => {
  await db.init(config.orm)
  await seed()
})()

const app = express()
app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/static', express.static('public'))
app.use(morgan(':status :method\t:url'))

app.use('/course', course)
app.use('/seniorproj', seniorProject)
app.use('/newstudent', newStudent)

app.get('/', (req, res) => {
  res.render('index', { title: 'DB WITH FEATURE CREEPS' })
})

app.listen(config.express.port, () => {
  console.log(`listening on port ${config.express.port}`)
})
