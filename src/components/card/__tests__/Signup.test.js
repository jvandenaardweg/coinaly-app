import { shallowMount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises';
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import Signup from '@/components/card/Signup.vue'

import userModule from '@/store/modules/user'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VeeValidate, { inject: false })

describe('components/card/Signup.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        user: userModule
      }
    })

    component = shallowMount(Signup, {
      store,
      localVue,
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('should fire the handleSubmit method when the form submits', async () => {
    component.setData({
      email: 'test@coinaly.io',
      password: 'testtest',
      privacyDisclaimer: true
    })
    const handleSubmitMock = jest.fn()
    component.setMethods({ handleSubmit: handleSubmitMock })

    component.find('form').trigger('submit')
    await flushPromises()
    expect(handleSubmitMock.mock.calls).toHaveLength(1)
  })

  it('should fire the dispatchCreateUser method when form submits', async () => {
    component.setData({
      email: 'test@coinaly.io',
      password: 'testtest',
      privacyDisclaimer: true
    })

    const dispatchCreateUserMock = jest.fn()
    dispatchCreateUserMock.mockResolvedValue(['user'])
    const redirectToSuccessMock = jest.fn()

    component.setMethods({
      dispatchCreateUser: dispatchCreateUserMock,
      redirectToSuccess: redirectToSuccessMock
    })

    component.find('form').trigger('submit')
    await flushPromises()
    expect(dispatchCreateUserMock.mock.calls).toHaveLength(1)
  })

  it('should redirect the user when form submits succesfully', async () => {
    component.setData({
      email: 'test@coinaly.io',
      password: 'testtest',
      privacyDisclaimer: true
    })
    component.find('form').trigger('submit')

    const dispatchCreateUserMock = jest.fn()
    dispatchCreateUserMock.mockResolvedValue(['user'])
    const redirectToSuccessMock = jest.fn()

    component.setMethods({
      dispatchCreateUser: dispatchCreateUserMock,
      redirectToSuccess: redirectToSuccessMock
    })
    await flushPromises()
    expect(dispatchCreateUserMock.mock.calls).toHaveLength(1)
    expect(redirectToSuccessMock.mock.calls).toHaveLength(1)
  })

  it('should show the correct button label for the verify password button', () => {
    const $button = component.find({ ref: 'buttonViewPassword' })
    expect(component.vm.viewPasswordLabel).toBe('Verify')
    $button.trigger('click')
    expect(component.vm.viewPasswordLabel).toBe('Hide')
    expect(component.vm.viewPasswordLabel).toBe('Hide')
  })

  it('should show the password in text when the user clicks the verify password button', () => {
    const $button = component.find({ ref: 'buttonViewPassword' })
    const $input = component.find({ ref: 'inputPassword' })
    $button.trigger('click')
    expect(component.vm.viewPasswordLabel).toBe('Hide')
    expect($input.attributes().type).toBe('text')
  })

  it('should disable the form when loading', () => {
    store.commit('user/startLoading')
    component.setData({
      isLoading: true
    })
    expect(component.find('form fieldset').attributes().disabled).toBe('disabled')
    component.setData({
      isLoading: false
    })
    expect(component.find('form fieldset').attributes().disabled).toBe(undefined)
  })

  it('should set the correct default label', () => {
    expect(component.vm.submitLabel).toBe('Create account')
  })

  it('should set the focus to the first input field', () => {
    const firstInputElm = component.find({ref: 'firstInput'}).vnode.elm
    expect(document.activeElement === firstInputElm).toBe(true)
  })

  it('should render the form without errors', () => {
    expect(component.vm.errors.count()).toBe(0)
  })

  it('should render an error when email is empty but form is submitted', async () => {
    component.find('form').trigger('submit')
    await flushPromises()
    expect(component.vm.errors.has('email')).toBe(true)
    expect(component.find({ref:'emailError'}).isVisible()).toBe(true)
  })

  it('should render an error when email is incorrect but form is submitted', async () => {
    component.setData({
      email: 'incorrect@email'
    })
    component.find('form').trigger('submit')
    await flushPromises()
    expect(component.vm.errors.has('email')).toBe(true)
    expect(component.find({ref:'emailError'}).isVisible()).toBe(true)
  })

  it('should render an error when password is empty but form is submitted', async () => {
    component.find('form').trigger('submit')
    await flushPromises()
    expect(component.vm.errors.has('password')).toBe(true)
    expect(component.find({ref:'passwordError'}).isVisible()).toBe(true)
  })
})
