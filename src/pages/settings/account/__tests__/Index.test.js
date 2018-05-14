import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import PageSettingsAccountIndex from '@/pages/settings/account/Index.vue'

import exchangesModule from '@/store/modules/exchanges'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('pages/settings/account/Index.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        exchanges: exchangesModule
      }
    })

    component = shallowMount(PageSettingsAccountIndex, {
      store,
      localVue,
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
