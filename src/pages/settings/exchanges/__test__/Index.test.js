import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import PageSettingsExchangesIndex from '@/pages/settings/exchanges/Index.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

import exchangesModule from '@/store/modules/exchanges'
import keysModule from '@/store/modules/keys'

describe('pages/settings/exchanges/Index.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        exchanges: exchangesModule,
        keys: keysModule
      }
    })

    component = shallowMount(PageSettingsExchangesIndex, {
      store,
      localVue,
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
