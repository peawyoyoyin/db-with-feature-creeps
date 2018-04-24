import 'module-alias/register'
import db from './db'
import seed from './db/seed'
import config from './config'

;(async () => {
  console.log('initializing DB...')
  await db.init({ dropSchema: true, synchronize: true, ...config.orm })
  console.log('intialize DB complete!')
  console.log('populating DB using seed...')
  await seed()
  console.log('seed complete!')
  await db._connection.close()
  process.exit(0)
})()
