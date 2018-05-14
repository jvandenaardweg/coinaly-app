import PageSignupIndex from '@/pages/signup/Index.vue'
import { shallowMount } from '@vue/test-utils'

describe('pages/signup/Index.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(PageSignupIndex)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
