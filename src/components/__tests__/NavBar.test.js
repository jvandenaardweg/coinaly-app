import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import NavBar from '@/components/NavBar.vue'

import authModule from '@/store/modules/auth'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('components/NavBar.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        auth: authModule
      }
    })

    component = shallow(NavBar, {
      store,
      localVue,
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
  
})
