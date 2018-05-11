import { shallow } from '@vue/test-utils'
import BalancesSummary from '@/components/BalancesSummary.vue'

describe('components/BalancesSummary.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(BalancesSummary)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
