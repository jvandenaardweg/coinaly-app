import PageLoginForgotIndex from '@/pages/login/forgot/Index.vue'
import { shallow } from '@vue/test-utils'

describe('pages/login/forgot/Index.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(PageLoginForgotIndex)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
