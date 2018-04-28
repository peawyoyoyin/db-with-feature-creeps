import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as session from 'express-session'
import * as morgan from 'morgan'
import * as passport from 'passport'
import * as flash from 'connect-flash'
import { Strategy } from 'passport-local'
import config from './config'
import { Connection, createConnection } from 'typeorm'
//this fixes path aliases
import 'module-alias/register'

import student from './routes/student'
import teacher from './routes/teacher'
import login from './routes/login'
import logout from './routes/logout'
import newStudent from './routes/newstudent'
import db from './db'
import seed from './db/seed'
import { initPassport } from './passport'

import { Student } from './entity/student'
;(async () => {
  if (config.autoSeed) {
    console.log('config.autoSeed is true, commencing seed...')
    await setTimeout(() => 0, 500)
    await require('./init')
  }
  await db.init({ ...config.orm, dropSchema: false, synchronize: false })
  console.log('DB initialization complete!')
})()

const app = express()
app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  session({
    secret: 'verysecret',
    resave: false,
    saveUninitialized: true
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use('/static', express.static('public'))
app.use(morgan(':status :method\t:url'))

initPassport()

app.use(/^(?!\/login)(?!\/newstudent).*$/, (req: any, res, next) => {
  if (!req.isAuthenticated()) res.redirect('/login')
  else next()
})

app.use('/login', login)
app.use('/student', student)
app.use('/teacher', teacher)
app.use('/newstudent', newStudent)
app.use('/logout', logout)

app.listen(config.express.port, () => {
  console.log(`listening on port ${config.express.port}`)
})
