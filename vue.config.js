const fs = require('fs')

// See: https://github.com/vuejs/vue-cli/blob/dev/docs/config.md
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: fs.readFileSync('./src/scss/bootstrap/_settings.scss', 'utf-8')
      }
    }
  },
  pwa: {
    name: 'Coinaly',
    themeColor: '#2e63b1',
    msTileColor: '#2e63b1',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      skipWaiting: true
    }
  },
  devServer: {
    port: 8080
  },
  pluginOptions: {
    critical: {
      width: 375,
      height: 565
    }
  }
}
