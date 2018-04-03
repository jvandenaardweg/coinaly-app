import { shallow } from '@vue/test-utils'
import NavBar from '@/components/NavBar.vue'

describe('components/NavBar.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(NavBar, {
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
