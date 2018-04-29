import { shallow } from '@vue/test-utils'
import EmptyState from '@/components/EmptyState.vue'

describe('components/EmptyState.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(EmptyState)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
