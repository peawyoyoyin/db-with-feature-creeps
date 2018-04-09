import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as morgan from 'morgan'
import config from './config'
import { Connection, createConnection } from 'typeorm'

import { Student } from './entity/student'

import courseRouter from './routes/course'
import seniorProjectRouter from './routes/seniorproj'


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
app.use(bodyParser.urlencoded())

app.use(morgan(':status :method\t:url', {
  skip: (req, res) => req.baseUrl.startsWith('/static')
}))

app.use('/static', express.static('public'))

app.use('/course', courseRouter)
app.use('/seniorproj', seniorProjectRouter)

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
