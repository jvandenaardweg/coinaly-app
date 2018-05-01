import PageOnboardingIndex from '@/pages/onboarding/Index.vue'
import { shallow } from '@vue/test-utils'

describe('pages/onboarding/Index.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(PageOnboardingIndex)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
