import { shallowMount } from '@vue/test-utils'
import PageMarkets from '@/pages/markets/Index.vue'

describe('pages/markets/Index.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(PageMarkets, {
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
