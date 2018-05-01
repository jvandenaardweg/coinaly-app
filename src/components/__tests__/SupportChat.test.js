import { shallow } from '@vue/test-utils'
import SupportChat from '@/components/SupportChat.vue'

describe('components/SupportChat.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(SupportChat)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('renders a correct default label', () => {
    expect(component.vm.buttonLabel).toBe(`Need help? Let's have a chat.`)
    expect(component.find('button').text()).toBe(`Need help? Let's have a chat.`)
  })

  it('renders a correct custom label', () => {
    component.setProps({
      label: 'Fancy a chat?'
    })
    expect(component.vm.buttonLabel).toBe(`Fancy a chat?`)
    expect(component.find('button').text()).toBe(`Fancy a chat?`)
  })

  it('renders a correct custom color', () => {
    component.setProps({
      color: 'primary'
    })
    expect(component.vm.btnClass).toBe('btn btn-outline-primary')
    expect(component.find('button').classes()).toContain('btn-outline-primary')
  })

  it('renders a button', () => {
    const button = component.find({ ref: 'chatButton' })
    expect(button.is('button')).toBe(true)
  })

  it('should handle the click on the button', () => {
    const handleClickMock = jest.fn()
    component.setMethods({ handleClick: handleClickMock })
    const button = component.find({ ref: 'chatButton' })

    button.trigger('click')
    expect(handleClickMock.mock.calls).toHaveLength(1)
  })
})
