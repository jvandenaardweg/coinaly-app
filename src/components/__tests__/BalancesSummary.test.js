import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import BalancesSummary from '@/components/BalancesSummary.vue'

import balancesModule from '@/store/modules/balances'
import pricesModule from '@/store/modules/prices'
import '@/filters'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('components/BalancesSummary.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        balances: balancesModule,
        prices: pricesModule
      }
    })

    component = shallowMount(BalancesSummary, {
      store,
      localVue,
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('renders a loading text when loading the needed data', () => {
    expect(component.find('h1').text()).toBe('Loading...')
  })

  it('renders a loading text for the additional pricing', () => {
    expect(component.find('h2').text()).toBe('Getting balance from the exchange')
  })
})
