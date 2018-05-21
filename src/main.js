// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import WebFont from 'webfontloader'
import store from '@/store'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import VeeValidate from 'vee-validate'
import { sync } from 'vuex-router-sync'
import '@/filters'

// Reduce the memory footprint of VeeValidate by injecting it on a component basis
// Use this in your component:
// $_veeValidate: {
//  validator: 'new'
// },
Vue.use(VeeValidate, {
  inject: false
})

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
    store.dispatch('auth/setOnLoad', savedToken)
  }
}

// Make sure the user is logged in, if not, present a login page
// TODO: get logged in user, check if onboarding is already done, if not: show onboarding, if so, show dashboard
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']
  const requiresAuth = to.meta.requiresAuth
  const isNotAllowed = (requiresAuth === true && !isAuthenticated)

  if (isNotAllowed) {
    next({
      path: '/login',
      query: {
        redirect: to.path
      }
    })
  // Redrect LOGGED IN users to the homepage if they want to enter a page that's for not logged in users only
  } else if (isAuthenticated && (to.path === '/login' || to.path === '/signup')) {
    next('/')
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
