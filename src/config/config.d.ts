import { ConnectionOptions } from 'typeorm'

export interface ExpressConfig {
  port?: number,
}

export interface ProjectConfig {
  express: ExpressConfig,
  orm: ConnectionOptions,
}
