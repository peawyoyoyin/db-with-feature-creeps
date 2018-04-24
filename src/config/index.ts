import { ConnectionOptions } from 'typeorm'
import * as extend from 'extend'

export interface ExpressConfig {
  port?: number,
}

export interface ProjectConfig {
  express: ExpressConfig,
  orm: ConnectionOptions,
  autoSeed: boolean
}

const config: ProjectConfig = (() => {
  try {
    const config = require('./config')
    const defaults = require('./config.default')
    return extend(true, defaults, config)
  } catch(error) {
    console.log('unable to find "src/config/config.ts", falling back to "src/config/config.default.ts"')
    return require('./config.default')
  }
})()

export default config
