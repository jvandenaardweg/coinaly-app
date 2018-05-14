import PageDisclaimerIndex from '@/pages/disclaimer/Index.vue'
import { shallowMount } from '@vue/test-utils'

describe('pages/disclaimer/Index.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(PageDisclaimerIndex)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
