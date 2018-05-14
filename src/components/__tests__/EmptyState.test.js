import { shallowMount } from '@vue/test-utils'
import EmptyState from '@/components/EmptyState.vue'

describe('components/EmptyState.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(EmptyState)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
