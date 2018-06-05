import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import CardSelectBalance from '@/components/card/CardSelectBalance.vue'

import balancesModule from '@/store/modules/balances'
import marketsModule from '@/store/modules/markets'
import symbolsModule from '@/store/modules/symbols'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('components/card/CardSelectBalance.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        balances: balancesModule,
        markets: marketsModule,
        symbols: symbolsModule
      }
    })

    component = shallowMount(CardSelectBalance, {
      store,
      localVue,
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
