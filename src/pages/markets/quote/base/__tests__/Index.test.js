import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import PageMarketsMarket from '@/pages/markets/quote/base/Index.vue'

import balancesModule from '@/store/modules/balances'
import marketsModule from '@/store/modules/markets'
import tickersModule from '@/store/modules/tickers'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('pages/markets/quote/base/Index.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        balances: balancesModule,
        markets: marketsModule,
        tickers: tickersModule
      }
    })

    component = shallowMount(PageMarketsMarket, {
      store,
      localVue,
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
