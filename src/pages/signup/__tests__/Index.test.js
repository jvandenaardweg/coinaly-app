import PageSignupIndex from '@/pages/signup/Index.vue'
import { shallow } from '@vue/test-utils'

describe('pages/signup/Index.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(PageSignupIndex)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
