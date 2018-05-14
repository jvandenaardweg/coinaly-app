import { shallowMount } from '@vue/test-utils'
import CardSelectMarket from '@/components/card/CardSelectMarket.vue'
import '@/filters'

import mocksMarkets from '@/services/websockets/mocks/markets.json'

describe('SelectMarket.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(CardSelectMarket, {
      stubs: ['router-link', 'router-view']
    })
  })

  it('should return correct hasMarkets value when having an array of markets', () => {
    component.setProps({
      quoteCurrencyMarkets: mocksMarkets
    })
    expect(component.vm.hasMarkets).toBe(true)
  })

  it('should set the correct selected base currency', () => {
    component.vm.handleSelectedCurrency('BTC')
    expect(component.vm.baseCurrency).toBe('BTC')
  })
})
