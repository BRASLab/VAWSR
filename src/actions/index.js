const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  Object.assign(modules, files(key))
})

module.exports = modules
