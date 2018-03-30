import { ConnectionOptions } from 'typeorm'

interface ExpressConfig {
  port?: number,
}

interface ProjectConfig {
  express: ExpressConfig,
  orm: ConnectionOptions,
}

export const config: ProjectConfig
