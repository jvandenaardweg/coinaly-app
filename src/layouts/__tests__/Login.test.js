import { shallow } from '@vue/test-utils'
import Login from '@/layouts/Login.vue'

describe('layouts/Login.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(Login, {
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
