import BtnSync from '@/components/btn/Sync.vue'
import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

describe('components/btn/Sync.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(BtnSync)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('should run method forceRefreshUserData and activateTimeout when clicking on the button', async () => {
    const forceRefreshUserDataMock = jest.fn()
    const activateTimeoutMock = jest.fn()
    component.setMethods({
      forceRefreshUserData: forceRefreshUserDataMock,
      activateTimeout: activateTimeoutMock
    })

    const $button = component.find('button')
    $button.trigger('click')
    expect(forceRefreshUserDataMock).toHaveBeenCalledTimes(1)
    await flushPromises()
    expect(activateTimeoutMock).toHaveBeenCalledTimes(1)
  })

  it('should show a loading indicator when isLoading is true', () => {
    component.vm.isLoading = true
    const $button = component.find('button')
    expect($button.classes().includes('is-loading')).toBe(true)
  })

  it('should show an alert when isDisabled is true and clicking on the button', () => {
    component.vm.isDisabled = true
    const showAlertMock = jest.fn()
    component.setMethods({
      showAlert: showAlertMock
    })

    const $button = component.find('button')
    $button.trigger('click')

    expect(showAlertMock).toHaveBeenCalledTimes(1)
  })
})
