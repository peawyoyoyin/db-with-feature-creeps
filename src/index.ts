import * as bodyParser from 'body-parser'
import * as express from 'express'
import config from './config'

const app = express()

app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.end('Hello World!')
})

app.listen(config.express.port, () => {
  console.log(`listening on port ${config.express.port}`)
})
