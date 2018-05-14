import { shallowMount } from '@vue/test-utils'
import Focus from '@/layouts/Focus.vue'

describe('layouts/Focus.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(Focus, {
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
