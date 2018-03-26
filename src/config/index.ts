import { ProjectConfig } from "./config.d";

const config = ((): ProjectConfig => {
  try {
    return { ...require('./config.default'), ...require('./config')}
  } catch(error) {
    console.log('unable to find "src/config/config.ts", falling back to "src/config/config.default.ts"')
    return require('./config.default')
  }
})()

export default config
