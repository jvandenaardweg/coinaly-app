import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Markets from '@/components/card/Markets.vue'

import marketsModule from '@/store/modules/markets'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('components/card/Markets.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        markets: marketsModule
      }
    })

    component = shallow(Markets, {
      store,
      localVue,
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
