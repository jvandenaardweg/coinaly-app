import ListGroupItemSymbolSelect from '@/components/list-group-item/SymbolSelect.vue'
import { shallow, createLocalVue } from '@vue/test-utils'

import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()


describe('components/list-group-item/Market.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(ListGroupItemSymbolSelect, {
      localVue,
      router,
      propsData: {
        currency: {
          name: 'Bitcoin'
        },
        symbol: 'BTC',
        meta: '$10,000.00'
      }
    })
  })
  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('renders the correct symbol', () => {
    expect(component.find('strong').text()).toBe('BTC')
  })

  // it('renders the correct balance free total', () => {
  //   expect(component.find('.symbol-full').text()).toBe('2')
  // })

  // it('renders the correct total worth in USD', () => {
  //   expect(component.vm.totalPriceUSD).toBe(18000)
  //   expect(component.find('.balance-item-price').text()).toBe('$18,000.00')
  // })
})
