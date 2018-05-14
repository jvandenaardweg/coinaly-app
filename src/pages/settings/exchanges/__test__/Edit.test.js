import PageSettingsExchangesEdit from '@/pages/settings/exchanges/Edit.vue'
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VeeValidate, { inject: false })

import exchangesModule from '@/store/modules/exchanges'
import keysModule from '@/store/modules/keys'

import mockExchangesAll from '@/mocks/exchanges-all.json'

const $route = {
  params: {
    exchangeSlug: 'bittrex'
  }
}

describe('pages/settings/Edit.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        exchanges: exchangesModule,
        keys: keysModule
      }
    })

    component = mount(PageSettingsExchangesEdit, {
      store,
      localVue,
      stubs: ['router-link', 'router-view'],
      mocks: {
        $route
      }
    })

    store.commit('exchanges/addAll', mockExchangesAll)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('renders the correct title', () => {
    expect(component.find('h1').text()).toBe('Edit Bittrex')
  })

  it('should have the correct exchange object', () => {
    expect(component.vm.selectedExchangeSlug).toBe('bittrex')
    expect(typeof component.vm.exchange).toBe('object')
    expect(component.vm.exchange.slug).toBe('bittrex')
    expect(component.vm.exchange.name).toBe('Bittrex')
  })

  it('should have the correct label names', () => {
    expect(component.findAll('label').at(0).text()).toBe('Bittrex API Key')
    expect(component.findAll('label').at(1).text()).toBe('Bittrex API Secret')
  })

  it('should have the correct placeholder names', () => {
    expect(component.findAll('input').at(0).attributes().placeholder).toBe('Your Bittrex API key')
    expect(component.findAll('input').at(1).attributes().placeholder).toBe('Your Bittrex API secret')
  })

  it('should have the correct button label', () => {
    expect(component.find('button[type="submit"]').text()).toBe('Save bittrex exchange')
  })

  it('should show errors when form is not filled in completely', async () => {
    component.find('button[type="submit"]').trigger('submit')
    await flushPromises()
    expect(component.findAll('.invalid-feedback').length).toBe(2)
  })

  it('should fire method dispatchUpdateKey when form submits after validation', async () => {
    component.setData({
      apiKey: '123123123123123',
      apiSecret: '1231231232332'
    })

    const dispatchUpdateKeyMock = jest.fn()
    component.setMethods({ dispatchUpdateKey: dispatchUpdateKeyMock })

    component.find('button[type="submit"]').trigger('submit')
    await flushPromises()

    expect(dispatchUpdateKeyMock.mock.calls).toHaveLength(1)
  })
})
