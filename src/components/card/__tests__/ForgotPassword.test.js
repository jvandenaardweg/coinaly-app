import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ForgotPassword from '@/components/card/ForgotPassword.vue'

import userModule from '@/store/modules/user'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('components/card/ForgotPassword.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        user: userModule
      }
    })

    component = shallow(ForgotPassword, {
      store,
      localVue,
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
