import PageLoginIndex from '@/pages/login/Index.vue'
import { shallow } from '@vue/test-utils'

describe('pages/login/Index.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(PageLoginIndex)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
