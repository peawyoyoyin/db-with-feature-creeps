import * as bodyParser from 'body-parser'
import * as express from 'express'
import config from './config'
import { Connection, createConnection } from 'typeorm'

import { Student } from './entity/student'

// const app = express()

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

// app.use(bodyParser.json())
// app.get('/', (req, res) => {
//   res.end('Hello World!')
// })

// app.listen(config.express.port, () => {
//   console.log(`listening on port ${config.express.port}`)
// })
