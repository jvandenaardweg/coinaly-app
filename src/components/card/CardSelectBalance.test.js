import { shallow } from '@vue/test-utils'
import CardSelectBalance from '@/components/card/CardSelectBalance.vue'

import mocksBalances from '@/services/api/mocks/balances.json'

describe('components/card/CardSelectBalance.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(CardSelectBalance, {
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('should return correct hasBalances value when having balances', () => {
    component.setProps({
      balances: mocksBalances
    })
    expect(component.vm.hasBalances).toBe(true)
  })

  it('should return correct hasBalances when having no balances', () => {
    component.setProps({
      balances: []
    })
    expect(component.vm.hasBalances).toBe(false)
  })

  // it('should correctly set the currency', () => {
  //   component.setProps({
  //     activeCurrency: 'BTC'
  //   })
  //   expect(component.vm.currency).toBe('BTC')
  // })


  it('should set the correct selected quote currency', () => {
    component.vm.handleSelectedCurrency('XVG')
    expect(component.vm.currency).toBe('XVG')
  })
})
