const config = (() => {
  try {
    return require('./config')
  } catch(error) {
    console.log('unable to find "src/config/config.ts", falling back to "src/config/config.default.ts"')
    return require('./config.default')
  }
})()

export default config
