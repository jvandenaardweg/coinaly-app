import BtnBack from '@/components/btn/Back.vue'
import { shallowMount } from '@vue/test-utils'

describe('components/btn/Back.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(BtnBack)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('should call method handleClick when clicked', () => {

    const handleClickMock = jest.fn()
    component.setMethods({ handleClick: handleClickMock })

    component.trigger('click')
    expect(handleClickMock.mock.calls).toHaveLength(1)
  })

})
