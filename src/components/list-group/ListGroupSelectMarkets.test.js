import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import balancesStore from '@/store/modules/balances'
import ListGroupSelectMarkets from '@/components/list-group/ListGroupSelectMarkets.vue'
import '@/filters'

import mocksMarkets from '@/services/websockets/mocks/markets.json'
import mocksBalances from '@/services/api/mocks/balances.json'

const localVue = createLocalVue()
localVue.use(Vuex)

const exampleSelectedCurrency = 'BTC'

describe('components/list-group/ListGroupSelectMarkets.vue', () => {
  let component
  let actions
  let state
  let store
  // const exampleSelectedCurrency = 'XVG'

  beforeEach(() => {
    state = {
      module: {
        clicks: 2
      }
    }

    actions = {
      moduleActionClick: jest.fn()
    }

    store = new Vuex.Store({
      state,
      actions,
      getters: balancesStore.getters
    })

    component = shallow(ListGroupSelectMarkets, {
      store,
      localVue,
      stubs: ['router-link', 'router-view']
    })
  })
  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  // it('should contain correct markets prop', () => {
  //   expect(component.vm.markets).toMatchObject(mocksMarkets)
  // })

  // it('should contain correct balances prop', () => {
  //   expect(component.vm.balances).toMatchObject(mocksBalances)
  // })

  // it('should contain correct activeCurrency prop', () => {
  //   component.setProps({
  //     activeCurrency: exampleSelectedCurrency
  //   })
  //   expect(component.vm.activeCurrency).toBe(exampleSelectedCurrency)
  // })

  // it('renders correct selected market currency when given as a prop', () => {
  //   component.setData({
  //     activeCurrency: exampleSelectedCurrency
  //   })
  //   const listGroupItem = component.find(`#list-group-item-${exampleSelectedCurrency}`)
  //   expect(listGroupItem.classes()).toContain('active')
  //   expect(component.vm.activeCurrency).toBe(exampleSelectedCurrency)
  // })

  // it('should contain correct currency data', () => {
  //   component.setProps({
  //     activeCurrency: 'BTC'
  //   })
  //   expect(component.vm.currency).toBe('BTC')
  // })

  // it('should return correct hasMarkets value when having an array of markets in markets prop', () => {
  //   expect(component.vm.hasMarkets).toBe(true)
  // })

  // it('should return correct hasMarkets value when markets prop is empty', () => {
  //   component.setProps({
  //     markets: null
  //   })
  //   expect(component.vm.hasMarkets).toBe(false)
  // })

  // it('should return correct last market price', () => {
  //   expect(component.vm.marketLast('BTC/USDT')).toBe(12000)
  // })

  // it('should render correct last market price', () => {
  //   const listGroupItemAmount = component.find(`#list-group-item-amount-${exampleSelectedCurrency}`)
  //   expect(listGroupItemAmount.text()).toBe('~ 0.0001 BTC')
  // })

  // it('should render correct symbol name', () => {
  //   const listGroupItemAmount = component.find(`#list-group-item-symbol-${exampleSelectedCurrency}`)
  //   expect(listGroupItemAmount.text()).toBe(exampleSelectedCurrency)
  // })

  // it('should render correct amount of symbols', () => {
  //   const listGroupItems = component.findAll('.list-group-item')
  //   const expectedLength = Object.keys(mocksMarkets).length
  //   expect(listGroupItems).toHaveLength(expectedLength)
  // })

  // it('renders correct selected currency when clicking on a currency', () => {
  //   const listGroupItem = component.find(`#list-group-item-${exampleSelectedCurrency}`)
  //   listGroupItem.trigger('click')
  //   expect(listGroupItem.classes()).toContain('active')
  //   expect(component.vm.currency).toBe(exampleSelectedCurrency)
  // })

  // it('renders correct currency icon', () => {
  //   const listGroupItemIcon = component.find(`#list-group-item-icon-${exampleSelectedCurrency}`)
  //   expect(listGroupItemIcon.attributes().src).toBeTruthy()
  // })

  // it('renders correct full name of a currency', () => {
  //   const listGroupItemName = component.find(`#list-group-item-name-${exampleSelectedCurrency}`)
  //   expect(listGroupItemName.text()).toBe('Bitcoin')
  // })

  // it('should emit selected currency back to parent', () => {
  //   const listGroupItem = component.find(`#list-group-item-${exampleSelectedCurrency}`)
  //   listGroupItem.trigger('click')
  //   expect(component.emitted('selectedCurrency')[0]).toEqual([exampleSelectedCurrency])
  // })
})
