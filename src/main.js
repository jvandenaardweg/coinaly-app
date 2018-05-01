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
import './filters'

Vue.config.productionTip = false

WebFont.load({
  google: {
    families: ['Source Sans Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i']
  }
})

if (process.env.SENTRY_URL) {
  Raven.config(process.env.SENTRY_URL).addPlugin(RavenVue, Vue).install()
}

if (window) {
  window.addEventListener('offline', (e) => store.commit('user/setOffline'))
  window.addEventListener('online', (e) => store.commit('user/setOnline'))
}

sync(store, router)

// Make sure the user is logged in when a token is present in localStorage
if (window.localStorage) {
  const savedToken = localStorage.getItem('token')
  if (savedToken) {
    store.dispatch('auth/setOnLoadAuth', savedToken)
  }
}

// Make sure the user is logged in, if not, present a login page
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
