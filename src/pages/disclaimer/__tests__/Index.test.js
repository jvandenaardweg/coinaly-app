import PageDisclaimerIndex from '@/pages/disclaimer/Index.vue'
import { shallow } from '@vue/test-utils'

describe('pages/disclaimer/Index.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(PageDisclaimerIndex)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
