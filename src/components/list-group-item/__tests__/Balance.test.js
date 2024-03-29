// import { shallowMount } from '@vue/test-utils'
import ListGroupItemBalance from '@/components/list-group-item/Balance.vue'
import { shallowMount } from '@vue/test-utils'
import '@/filters'

import marketMock from '@/mocks/market.json'
import balanceMock from '@/mocks/balance.json'
import symbolMock from '@/mocks/symbol.json'

describe('components/list-group-item/Balance.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(ListGroupItemBalance, {
      stubs: ['router-link', 'router-view'],
      propsData: {
        balance: balanceMock['BTC'],
        symbolId: 'BTC',
        symbol: symbolMock['BTC'],
        price: 18000,
        tickerLast: 1,
        tickerQuote: 'USDT',
        percentage: 0
      }
    })
  })
  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('renders the correct symbol', () => {
    expect(component.find('strong').text()).toBe('BTC')
  })

  it('renders the correct balance free total', () => {
    expect(component.find('.symbol-full').text()).toBe('2')
  })

  it('renders the correct total worth in USD', () => {
    expect(component.find('.balance-item-price').text()).toBe('$18,000.00')
  })
})
