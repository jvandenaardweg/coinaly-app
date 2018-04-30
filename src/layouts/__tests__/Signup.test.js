import { shallow } from '@vue/test-utils'
import Signup from '@/layouts/Signup.vue'

describe('layouts/Signup.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(Signup, {
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
