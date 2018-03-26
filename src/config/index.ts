import { ProjectConfig, ExpressConfig } from "./config.d";
import { ConnectionOptions } from "typeorm";

const config = ((): ProjectConfig => {
  try {
    const config = require('./config')
    const defaults = require('./config.default')

    return { 
      express: <ExpressConfig> {
        ...defaults.express,
        ...config.express,
      },
      orm: <ConnectionOptions> {
        ...defaults.orm,
        ...config.orm,
      }
     }
  } catch(error) {
    console.log('unable to find "src/config/config.ts", falling back to "src/config/config.default.ts"')
    return require('./config.default')
  }
})()

export default config
