import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import CardSelectBalance from '@/components/card/CardSelectBalance.vue'

import balancesModule from '@/store/modules/balances'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('components/card/CardSelectBalance.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        balances: balancesModule
      }
    })

    component = shallow(CardSelectBalance, {
      store,
      localVue,
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
