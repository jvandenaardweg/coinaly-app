import { shallowMount } from '@vue/test-utils'
import TabBar from '@/components/TabBar.vue'

describe('components/TabBar.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(TabBar, {
      stubs: ['router-link']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
