import { ConnectionOptions } from 'typeorm'
import { ExpressConfig } from './config.d'

export = {
  express: <ExpressConfig> {
    port: process.env.PORT || 80,
  },
  orm: <ConnectionOptions> {
    name: 'main',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'db',
    entities: ['build/entity/*.js'],
    synchronize: true,
  }
}
