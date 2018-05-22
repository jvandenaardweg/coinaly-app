import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import SelectExchange from '@/components/btn/SelectExchange.vue'
import flushPromises from 'flush-promises'
import clickOutsideDirective from '@/directives/click-outside'

import exchangesModule from '@/store/modules/exchanges'
import keysModule from '@/store/modules/keys'

import exchangesAllMock from '@/mocks/exchanges-all.json'
import keysMock from '@/mocks/keys.json'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(clickOutsideDirective)

describe('components/btn/SelectExchange.vue', () => {
  let component
  let store
  let $dropdownMenu
  let $dropdownMenuButton
  let $buttonLogout
  let $buttonReload
  let $buttonExchangeSettings

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        exchanges: exchangesModule,
        keys: keysModule
      }
    })

    component = shallowMount(SelectExchange, {
      store,
      localVue,
      stubs: ['router-link', 'router-view']
    })

    $dropdownMenu = component.find('.dropdown-menu')
    $dropdownMenuButton = component.find('#dropdownMenuButton')
    $buttonLogout = component.find('#buttonLogout')
    $buttonReload = component.find('#buttonReload')
    $buttonExchangeSettings = component.find('#buttonExchangeSettings')
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('should open the dropdown when clicked on the button', async () => {
    $dropdownMenuButton.trigger('click')
    expect($dropdownMenu.classes().includes('show')).toBe(true)
  })

  it('should close the dropdown when clicked on the button when the dropdown is open', async () => {
    $dropdownMenuButton.trigger('click')
    $dropdownMenuButton.trigger('click')
    expect($dropdownMenu.classes().includes('show')).toBe(false)
  })

  it('should show the available exchanges for the logged in user in the dropdown', async () => {
    store.commit('exchanges/addAll', exchangesAllMock)
    store.commit('keys/addAll', keysMock)

    expect(component.findAll('.dropdown-item-exchange')).toHaveLength(2)
    expect(component.findAll('.dropdown-item-exchange').at(0).text()).toBe('Switch to: Bittrex')
    expect(component.findAll('.dropdown-item-exchange').at(1).text()).toBe('Switch to: Binance')
  })

  it('should show a loading indicator when switching exchanges', async () => {
    store.commit('exchanges/addAll', exchangesAllMock)
    store.commit('keys/addAll', keysMock)

    const $firstExchangeItem = component.findAll('.dropdown-item-exchange').at(0)
    const loadAllDataMock = jest.fn()

    component.setMethods({
      loadAllData: loadAllDataMock
    })

    $firstExchangeItem.trigger('click')

    await flushPromises()

    expect($dropdownMenuButton.text()).toBe('Switching...')
  })

  it('should trigger loadAllData when switching exchanges', async () => {
    store.commit('exchanges/addAll', exchangesAllMock)
    store.commit('keys/addAll', keysMock)

    const $firstExchangeItem = component.findAll('.dropdown-item-exchange').at(0)
    const loadAllDataMock = jest.fn()

    component.setMethods({
      loadAllData: loadAllDataMock
    })

    $firstExchangeItem.trigger('click')

    await flushPromises()

    expect(component.vm.loadAllData).toHaveBeenCalledTimes(1)
  })

  it('should trigger handleClickLogout when clicking the logout button', async () => {
    const handleClickLogoutMock = jest.fn()
    component.setMethods({
      handleClickLogout: handleClickLogoutMock
    })

    $buttonLogout.trigger('click')

    await flushPromises()

    expect(component.vm.handleClickLogout).toHaveBeenCalledTimes(1)
  })

  it('should trigger handleClickReload when clicking the reload button', async () => {
    const handleClickReloadMock = jest.fn()
    component.setMethods({
      handleClickReload: handleClickReloadMock
    })

    $buttonReload.trigger('click')

    await flushPromises()

    expect(component.vm.handleClickReload).toHaveBeenCalledTimes(1)
  })
})
