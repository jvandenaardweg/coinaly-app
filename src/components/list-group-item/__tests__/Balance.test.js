// import { shallowMount } from '@vue/test-utils'
import ListGroupItemBalance from '@/components/list-group-item/Balance.vue'
import { shallowMount } from '@vue/test-utils'
import '@/filters'

import marketMock from '@/mocks/market.json'
import balanceMock from '@/mocks/balance.json'

describe('components/list-group-item/Market.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(ListGroupItemBalance, {
      stubs: ['router-link', 'router-view'],
      propsData: {
        market: marketMock['BTC/USDT'],
        balance: balanceMock['BTC'],
        symbol: 'BTC',
        currency: {
          name: 'Bitcoin'
        },
        price: {
          USD: 9000
        },
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
    expect(component.vm.totalPriceUSD).toBe(18000)
    expect(component.find('.balance-item-price').text()).toBe('$18,000.00')
  })
})
