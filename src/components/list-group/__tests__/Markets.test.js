import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Markets from '@/components/list-group/Markets.vue'

import marketsModule from '@/store/modules/markets'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('components/list-group/Markets.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        markets: marketsModule
      }
    })

    component = shallowMount(Markets, {
      store,
      localVue,
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
