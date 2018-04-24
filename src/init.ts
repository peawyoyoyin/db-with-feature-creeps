import 'module-alias/register'
import db from './db'
import seed from './db/seed'
import config from './config'

module.exports = (async () => {
  console.log('initializing DB...')
  await db.init({ ...config.orm, dropSchema: true, synchronize: true  })
  console.log('intialize DB complete!')
  console.log('populating DB using seed...')
  await seed()
  console.log('seed complete!')
  await db._connection.close()
})()
