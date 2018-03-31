// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import WebFont from 'webfontloader'
import store from './store'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

WebFont.load({
  google: {
    families: ['Source Sans Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i']
  }
})

if (process.env.SENTRY_URL) {
  Raven.config(process.env.SENTRY_URL).addPlugin(RavenVue, Vue).install()
}

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
