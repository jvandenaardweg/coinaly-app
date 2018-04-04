import { shallow } from '@vue/test-utils'
import SubNav from '@/components/SubNav.vue'

describe('components/SubNav.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(SubNav, {
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
