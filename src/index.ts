import * as bodyParser from 'body-parser'
import * as express from 'express'
import config from './config'
import { Connection, createConnection } from 'typeorm'

import { Student } from './entity/student'

;(async () => {
  const connection: Connection = await createConnection(config.orm)
  const repo = connection.getRepository(Student)
  // const test = repo.create({
    //   studentID: '5834515112',
    //   firstName: 'John',
    //   lastName: 'Doe',
    //   citizenID: '1579900777777',
    //   year: 2558,
    //   nationality: 'TH'
    // })
    // repo.save(test)
  })()
  
const app = express()
app.set('view engine', 'pug')
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('index', { title: 'DB WITH FEATURE CREEPS', message: 'HELLO FEATURE CREEPS' })
})
  
app.listen(config.express.port, () => {
  console.log(`listening on port ${config.express.port}`)
})
