export = {
  express: {
    port: process.env.PORT || 80,
  },
  orm: {
    name: 'main',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'db',
    entities: ['build/entity/**/*.js'],
    synchronize: true,
    logging: process.env.NODE_ENV !== 'production'
  }
}
