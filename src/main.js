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
import clickOutsideDirective from '@/directives/click-outside'

Vue.use(clickOutsideDirective)

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

// Remember the previous route path to persist page state for the user
let previousRoutePath = (store.state.route) ? store.state.route.path : null
// if (previousRoutePath) {
//   console.log(window.location, previousRoutePath)
//   window.history.replaceState(store.state.route, 'foo', previousRoutePath)
// }

window.onpopstate = function (event) {
  console.log('location: ' + document.location + ', state: ' + JSON.stringify(event.state))
}

sync(store, router)
// console.log('previousRoutePath', previousRoutePath)

// console.log('router.replace', previousRoutePath)

// Make sure the user is logged in when a token is present in localStorage
if (window.localStorage) {
  const savedToken = localStorage.getItem('token')
  if (savedToken) {
    store.dispatch('auth/setOnLoad', savedToken)
  }
}

router.onReady(next => {
  console.log('ready')

  // if (previousRoutePath) {
  //   // router.go(-1)
  //   router.replace({
  //     path: previousRoutePath
  //   })
  // }
})

router.beforeEach((to, from, next) => {
  if (to.path === from.path && previousRoutePath) {
    router.replace({
      path: previousRoutePath,
      meta: {
        fromPwa: true
      }
    })
  } else {
    next()
  }

  // next()
  // console.log('to', to.path, 'from', from.path)
  // next()
})

// Make sure the user is logged in, if not, present a login page
// TODO: get logged in user, check if onboarding is already done, if not: show onboarding, if so, show dashboard
// router.beforeEach((to, from, next) => {
//   // console.log(to, from)
//   // If URL contains "?pwa=home", it means the PWA app tries to open the "start_url"
//   // Page opened in PWA environment, only then we want to render the previous route
//   // if (to.query.pwa && previousRoutePath) {
//   //   console.log('should force the page to render: ', previousRoutePath)
//   //   // Go back in history state, so we can replace the navigate to
//   //   router.go(-1)

//   //   // Replace the history, so essentially removing the navigation to "/?pwa=home"
//   //   router.replace({
//   //     path: previousRoutePath
//   //   })
//   //   previousRoutePath = null
//   //   return
//   // }

//   const isAuthenticated = store.getters['auth/isAuthenticated']
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   const isNotAllowed = (requiresAuth === true && !isAuthenticated)

//   if (isNotAllowed) {
//     next({
//       path: '/login',
//       query: {
//         redirect: to.path
//       }
//     })
//   // Redrect LOGGED IN users to the homepage if they want to enter a page that's for not logged in users only
//   } else if (isAuthenticated && (to.path === '/login' || to.path === '/signup')) {
//     next('/')
//   } else {
//     if (previousRoutePath && previousRoutePath !== '/') {
//       router.replace({
//         path: previousRoutePath
//       })
//       previousRoutePath = null
//     } else {
//       next()
//     }
//     // next()
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
