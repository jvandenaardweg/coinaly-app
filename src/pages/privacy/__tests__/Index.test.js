import PagePrivacyIndex from '@/pages/privacy/Index.vue'
import { shallowMount } from '@vue/test-utils'

describe('pages/privacy/Index.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(PagePrivacyIndex)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
