const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  if (key.match(/\.\/index.*js/)) return
  Object.assign(modules, files(key))
})

module.exports = modules
