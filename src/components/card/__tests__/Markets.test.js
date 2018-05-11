import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Markets from '@/components/card/Markets.vue'

import marketsModule from '@/store/modules/markets'
import currenciesModule from '@/store/modules/currencies'
import tickersModule from '@/store/modules/tickers'

import marketsMock from '@/mocks/markets.json'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('components/card/Markets.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        markets: marketsModule,
        currencies: currenciesModule,
        tickers: tickersModule
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

  it('renders the correct available markets', () => {
    store.commit('markets/addAll', marketsMock)
    expect(component.find('.h5').text()).toBe('Available markets (2)')
  })
})
