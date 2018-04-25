import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as morgan from 'morgan'
import config from './config'
import { Connection, createConnection } from 'typeorm'
//this fixes path aliases
import 'module-alias/register'

import login from './routes/login'
import course from './routes/course'
import grade from './routes/grade'
import seniorProject from './routes/seniorproj'
import newStudent from './routes/newstudent'
import db from './db'
import seed from './db/seed'

import { Student } from './entity/student'

(async () => {
  if(config.autoSeed) {
    console.log('config.autoSeed is true, commencing seed...')
    await setTimeout(() => (0), 500)
    await require('./init')
  }
  await db.init({...config.orm, dropSchema: false, synchronize: false})
  console.log('DB initialization complete!')
})()

const app = express()
app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/static', express.static('public'))
app.use(morgan(':status :method\t:url'))

app.use('/login', login)
app.use('/course', course)
app.use('/seniorproj', seniorProject)
app.use('/newstudent', newStudent)
app.use('/grade', grade)

app.get('/', (req, res) => {
  res.render('index', { title: 'DB WITH FEATURE CREEPS' })
})

app.listen(config.express.port, () => {
  console.log(`listening on port ${config.express.port}`)
})
