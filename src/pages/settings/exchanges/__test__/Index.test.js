import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import PageSettingsExchangesIndex from '@/pages/settings/exchanges/Index.vue'

import exchangesModule from '@/store/modules/exchanges'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('pages/settings/exchanges/Index.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        exchanges: exchangesModule
      }
    })

    component = shallow(PageSettingsExchangesIndex, {
      store,
      localVue,
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
