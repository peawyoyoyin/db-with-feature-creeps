import 'module-alias/register'
import db from './db'
import config from './config'

module.exports = (async () => {
  console.log('initializing DB...')
  await db.init({ ...config.orm, dropSchema: true, synchronize: true  })
  console.log('intialize DB complete!')
  await db._connection.close()
})()
