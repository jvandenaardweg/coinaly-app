import PagePrivacyIndex from '@/pages/privacy/Index.vue'
import { shallow } from '@vue/test-utils'

describe('pages/privacy/Index.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(PagePrivacyIndex)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
