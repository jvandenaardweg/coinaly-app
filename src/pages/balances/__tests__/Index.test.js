import PageBalancesIndex from '@/pages/balances/Index.vue'
import { shallow } from '@vue/test-utils'

describe('pages/balances/Index.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(PageBalancesIndex)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
