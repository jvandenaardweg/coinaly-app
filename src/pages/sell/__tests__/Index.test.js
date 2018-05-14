// import { shallowMount } from '@vue/test-utils'
import SellPage from '@/pages/sell/Index.vue'
import { shallowMount } from '@vue/test-utils'

describe('pages/sell/Index.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(SellPage, {
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
