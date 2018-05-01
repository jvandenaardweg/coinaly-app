import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ExchangeStatus from '@/components/ExchangeStatus.vue'

import websocketsModule from '@/store/modules/websockets'
import userModule from '@/store/modules/user'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('components/ExchangeStatus.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        websockets: websocketsModule,
        user: userModule
      }
    })

    component = shallow(ExchangeStatus, {
      store,
      localVue,
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
