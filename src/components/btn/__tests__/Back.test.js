import BtnBack from '@/components/btn/Back.vue'
import { shallow } from '@vue/test-utils'

describe('components/btn/Back.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(BtnBack)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('should call method handleBack when clicked', () => {

    const handleClickMock = jest.fn()
    component.setMethods({ handleClick: handleClickMock })

    component.trigger('click')
    expect(handleClickMock.mock.calls).toHaveLength(1)
  })

})
