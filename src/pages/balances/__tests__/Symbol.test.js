import PageBalancesSymbol from '@/pages/balances/Symbol.vue'
import { shallowMount } from '@vue/test-utils'

describe('pages/balances/Symbol.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(PageBalancesSymbol, {
      stubs: ['router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
