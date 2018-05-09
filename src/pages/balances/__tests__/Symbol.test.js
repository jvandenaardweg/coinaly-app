import PageBalancesSymbol from '@/pages/balances/Symbol.vue'
import { shallow } from '@vue/test-utils'

describe('pages/balances/Symbol.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(PageBalancesSymbol, {
      stubs: ['router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
