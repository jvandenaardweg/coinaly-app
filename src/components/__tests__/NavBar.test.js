import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import flushPromises from 'flush-promises'
import NavBar from '@/components/NavBar.vue'

import authModule from '@/store/modules/auth'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

const routes = [
  { path: '/balances', name: 'Balances' },
  { path: '/balances/BTC', name: 'BTC' }
]

const router = new VueRouter({
  routes
})

describe('components/NavBar.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        auth: authModule
      }
    })

    component = shallowMount(NavBar, {
      store,
      localVue,
      router
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('should show the back button when user is a level deep in a route', () => {
    router.push({ path: '/balances/BTC' })
    const $navbarBack = component.find({ref: 'navbarBack'})
    expect($navbarBack.exists()).toBe(true)
  })

  it('should not show the back button when user is on a root level route', () => {
    router.push({ path: '/balances' })
    const $navbarBack = component.find({ref: 'navbarBack'})
    expect($navbarBack.exists()).toBe(false)
  })

  it('should not show the authenticated user controls when not logged in', () => {
    const $navbarAuthenticated = component.find({ref: 'navbarAuthenticated'})
    expect($navbarAuthenticated.exists()).toBe(false)
  })

  it('should show the authenticated user controls when the user is logged in', () => {
    store.commit('auth/setAuthenticated')
    const $navbarAuthenticated = component.find({ref: 'navbarAuthenticated'})
    expect($navbarAuthenticated.exists()).toBe(true)
  })

  it('should display the route name in the title', () => {
    router.push({ path: '/balances/BTC' })
    const $navbarTitle = component.find({ref: 'navbarTitle'})
    expect($navbarTitle.text()).toBe('BTC')
  })
})
