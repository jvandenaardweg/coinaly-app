import { shallow } from '@vue/test-utils'
import HorizontalScroller from '@/components/HorizontalScroller.vue'

describe('components/HorizontalScroller.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(HorizontalScroller)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
