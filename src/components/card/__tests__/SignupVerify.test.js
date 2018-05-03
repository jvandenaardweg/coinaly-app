import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import SignupVerify from '@/components/card/SignupVerify.vue'

import authModule from '@/store/modules/auth'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('components/card/SignupVerify.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        auth: authModule
      }
    })

    component = shallow(SignupVerify, {
      store,
      localVue,
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
