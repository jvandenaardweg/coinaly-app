import { shallow } from '@vue/test-utils'
import ListRadioCurrency from '@/components/ListRadioCurrency.vue'
import '../filters'

import mocksBalances from '@/services/api/mocks/balances.json'

describe('components/ListRadioCurrency.vue', () => {
  let component
  const exampleSelectedCurrency = 'XVG'

  beforeEach(() => {
    component = shallow(ListRadioCurrency, {
      stubs: ['router-link', 'router-view'],
      propsData: {
        currencies: mocksBalances
      }
    })
  })
  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('should contain correct currencies prop', () => {
    expect(component.vm.currencies).toMatchObject(mocksBalances)
  })

  it('renders correct amount of currencies', () => {
    const listGroupItems = component.findAll('.list-group-item')
    expect(listGroupItems.length).toBe(Object.keys(mocksBalances).length)
  })

  it('renders correct selected currency when given as a prop', () => {
    component.setData({
      activeCurrency: exampleSelectedCurrency
    })
    const listGroupItem = component.find(`#list-group-item-${exampleSelectedCurrency}`)
    expect(listGroupItem.classes()).toContain('active')
    expect(component.vm.activeCurrency).toBe(exampleSelectedCurrency)
  })

  it('renders correct selected currency when clicking on a currency', () => {
    const listGroupItem = component.find(`#list-group-item-${exampleSelectedCurrency}`)
    listGroupItem.trigger('click')
    expect(listGroupItem.classes()).toContain('active')
    expect(component.vm.currency).toBe(exampleSelectedCurrency)
  })

  it('renders correct currency icon', () => {
    const listGroupItemIcon = component.find(`#list-group-item-icon-${exampleSelectedCurrency}`)
    expect(listGroupItemIcon.attributes().src).toBeTruthy()
  })

  it('renders correct full name of a currency', () => {
    const listGroupItemName = component.find(`#list-group-item-name-${exampleSelectedCurrency}`)
    expect(listGroupItemName.text()).toBe('Verge')
  })

  it('renders correct available amount', () => {
    const listGroupItemAmount = component.find(`#list-group-item-amount-${exampleSelectedCurrency}`)
    expect(listGroupItemAmount.text()).toBe('1,500 XVG')
  })

  it('renders empty state message when there are no currencies', () => {
    component.setProps({
      currencies: null
    })
    const listGroupItemAmount = component.find('.list-group-item')
    expect(listGroupItemAmount.text()).toBe('No currencies available.')
  })

  it('should emit selected currency back to parent', () => {
    const listGroupItem = component.find(`#list-group-item-${exampleSelectedCurrency}`)
    listGroupItem.trigger('click')
    expect(component.emitted('selectedCurrency')[0]).toEqual([exampleSelectedCurrency])
  })
})
