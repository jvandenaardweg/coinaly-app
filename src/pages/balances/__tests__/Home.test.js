import PageBalancesHome from '@/pages/balances/Home.vue'
import { shallowMount } from '@vue/test-utils'

describe('pages/balances/Home.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(PageBalancesHome, {
      stubs: ['router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
