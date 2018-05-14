import { shallowMount } from '@vue/test-utils'
import BalancesSummary from '@/components/BalancesSummary.vue'

describe('components/BalancesSummary.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(BalancesSummary)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
