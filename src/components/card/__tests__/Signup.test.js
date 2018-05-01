import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Signup from '@/components/card/Signup.vue'

import userModule from '@/store/modules/user'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('components/card/Signup.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        user: userModule
      }
    })

    component = shallow(Signup, {
      store,
      localVue,
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
