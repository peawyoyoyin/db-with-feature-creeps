import {ConnectionOptions} from 'typeorm'

export = {
  express: {
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
  }
}
