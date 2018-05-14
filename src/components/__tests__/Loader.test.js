import { shallowMount } from '@vue/test-utils'
import Loader from '@/components/Loader.vue'

describe('components/Loader.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(Loader)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
