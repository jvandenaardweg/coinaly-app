import PageSignupSuccessIndex from '@/pages/signup/success/Index.vue'
import { shallow } from '@vue/test-utils'

describe('pages/signup/success/Index.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(PageSignupSuccessIndex)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
