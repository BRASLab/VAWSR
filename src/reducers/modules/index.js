const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  if (key.match(/\.\/index.*js/)) return
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default modules
