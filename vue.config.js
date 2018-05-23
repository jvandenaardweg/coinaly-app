const fs = require('fs')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: fs.readFileSync('./src/scss/bootstrap/_setting.scss', 'utf-8')
      }
    }
  }
}
