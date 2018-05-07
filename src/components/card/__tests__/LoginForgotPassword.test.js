import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import CardLoginForgotPassword from '@/components/card/LoginForgotPassword.vue'

import authModule from '@/store/modules/auth'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VeeValidate, { inject: false })

describe('components/card/LoginForgotPassword.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        auth: authModule
      }
    })

    component = shallow(CardLoginForgotPassword, {
      store,
      localVue,
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
