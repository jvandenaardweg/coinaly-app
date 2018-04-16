// import { shallow, createLocalVue } from '@vue/test-utils'
import '@/filters'
import store from '@/store'
import { shallow } from '@vue/test-utils'
// import Vuex from 'vuex'
// import storeModuleBalances from '@/store/modules/balances'
import CardSelectBalance from '@/components/card/CardSelectBalance.vue'
// import Vuex from 'vuex'
// import balancesStore from '@/store/modules/balances'
// import mocksBalances from '@/services/api/mocks/balances.json'

// const localVue = createLocalVue()

// localVue.use(Vuex)
// const localVue = createLocalVue()
// localVue.use(Vuex)

describe('components/card/CardSelectBalance.vue', () => {
  let component
  // let actions
  // let state
  // let store

  beforeEach(() => {
    // state = {
    //   balances: {
    //     currencies: mocksBalances
    //   }
    // }

    // actions = {
    //   moduleActionClick: jest.fn()
    // }

    // store = new Vuex.Store({
    //   state,
    //   getters: balancesStore.getters
    // })

    component = shallow(CardSelectBalance, {
      store,
      // localVue,
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  // it('should render the correct amount of balances', () => {
  //   console.log(store.state.balances.currencies)
  //   // console.log(component.find('.list-group-item'))
  //   expect(component.vm.hasBalances).toBe(true)
  // })

  // it('should return correct hasBalances when having no balances', () => {
  //   component.setProps({
  //     balances: []
  //   })
  //   expect(component.vm.hasBalances).toBe(false)
  // })

  // it('should correctly set the currency', () => {
  //   component.setProps({
  //     activeCurrency: 'BTC'
  //   })
  //   expect(component.vm.currency).toBe('BTC')
  // })


  // it('should set the correct selected quote currency', () => {
  //   component.vm.handleSelectedCurrency('XVG')
  //   expect(component.vm.currency).toBe('XVG')
  // })
})
