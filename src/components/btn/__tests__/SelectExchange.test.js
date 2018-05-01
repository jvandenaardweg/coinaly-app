import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import SelectExchange from '@/components/btn/SelectExchange.vue'

import exchangesModule from '@/store/modules/exchanges'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('components/btn/SelectExchange.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        exchanges: exchangesModule
      }
    })

    component = shallow(SelectExchange, {
      store,
      localVue,
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})