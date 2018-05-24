import { shallowMount } from '@vue/test-utils'
import UpdateBanner from '@/components/UpdateBanner.vue'

describe('components/UpdateBanner.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(UpdateBanner)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('should not render a message when hasUpdate is false', () => {
    component.setData({
      hasUpdate: false
    })
    expect(component.find({ref: 'updateBannerMessage'}).isVisible()).toBe(false)
  })

  it('renders the message when hasUpdate is true', () => {
    component.setData({
      hasUpdate: true
    })
    expect(component.find({ref: 'updateBannerMessage'}).isVisible()).toBe(true)
  })

  it('should reload the page when clicking the button', () => {
    component.setData({
      hasUpdate: true
    })

    const handleClickMock = jest.fn()

    component.setMethods({
      handleClick: handleClickMock
    })

    component.find('button').trigger('click')

    expect(handleClickMock).toHaveBeenCalledTimes(1)
  })
})
