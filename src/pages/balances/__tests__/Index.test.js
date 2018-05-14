import PageBalancesIndex from '@/pages/balances/Index.vue'
import { shallowMount } from '@vue/test-utils'

describe('pages/balances/Index.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(PageBalancesIndex, {
      stubs: ['router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
