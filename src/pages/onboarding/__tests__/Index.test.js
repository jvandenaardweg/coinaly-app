import PageOnboardingIndex from '@/pages/onboarding/Index.vue'
import { shallowMount } from '@vue/test-utils'

describe('pages/onboarding/Index.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(PageOnboardingIndex)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
