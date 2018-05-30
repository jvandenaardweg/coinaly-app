import { shallowMount, createLocalVue } from '@vue/test-utils'
import TabBar from '@/components/TabBar.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

import ordersModule from '@/store/modules/orders'

describe('components/TabBar.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        orders: ordersModule
      }
    })

    component = shallowMount(TabBar, {
      store,
      localVue,
      stubs: ['router-link']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
