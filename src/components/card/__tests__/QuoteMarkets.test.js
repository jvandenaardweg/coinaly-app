import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import QuoteMarkets from '@/components/card/QuoteMarkets.vue'

import marketsModule from '@/store/modules/markets'
import symbolsModule from '@/store/modules/symbols'
import tickersModule from '@/store/modules/tickers'

import marketsMock from '@/mocks/markets.json'
import tickersMock from '@/mocks/tickers.json'
import symbolsMock from '@/mocks/symbols.json'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueRouter)

const routes = [
  { path: '/sell', name: 'Sell' }
]
const router = new VueRouter({
  routes
})

describe('components/card/QuoteMarkets.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        markets: marketsModule,
        symbols: symbolsModule,
        tickers: tickersModule
      }
    })

    component = mount(QuoteMarkets, {
      store,
      localVue,
      router
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('renders a loading indicator when loading the needed data', () => {
    expect(component.find('.loader').isVisible()).toBe(true)
  })

  it('renders the correct available markets', () => {
    // Populate the store with the needed data
    store.commit('markets/addAll', marketsMock)
    store.commit('tickers/setTickers', tickersMock)
    store.commit('symbols/addAll', symbolsMock)

    component.setProps({
      baseId: 'BTC'
    })

    // Should display the "BTC/USDT" market displaying "USDT"
    expect(component.findAll('.list-group-item').length).toBe(1)
    expect(component.findAll('.list-group-item strong').at(0).text()).toBe('USDT')
  })

  it('renders an empty message when there are no markets available', () => {
    // Populate the store with the needed data
    store.commit('markets/addAll', marketsMock)
    store.commit('tickers/setTickers', tickersMock)
    store.commit('symbols/addAll', symbolsMock)

    component.setProps({
      baseId: 'NOTAVAILABLE'
    })

    expect(component.find('.card-partial-empty').text()).toBe('There are no markets available for NOTAVAILABLE.')
  })
})
