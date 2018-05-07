import { shallow, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import CardLogin from '@/components/card/Login.vue'

import userModule from '@/store/modules/user'
import authModule from '@/store/modules/auth'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VeeValidate, { inject: false })

describe('components/card/Login.vue', () => {
  let component
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        user: userModule,
        auth: authModule
      }
    })

    component = shallow(CardLogin, {
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
      password: 'testtest'
    })
    const handleSubmitMock = jest.fn()
    component.setMethods({ handleSubmit: handleSubmitMock })

    component.find('form').trigger('submit')
    await flushPromises()
    expect(handleSubmitMock.mock.calls).toHaveLength(1)
  })

  it('should fire the dispatchLogin method when form submits', async () => {
    component.setData({
      email: 'test@coinaly.io',
      password: 'testtest'
    })

    const dispatchLoginMock = jest.fn()

    component.setMethods({
      dispatchLogin: dispatchLoginMock
    })

    component.find('form').trigger('submit')
    await flushPromises()
    expect(dispatchLoginMock.mock.calls).toHaveLength(1)
  })

  it('should redirect the user when form submits succesfully', async () => {
    component.setData({
      email: 'test@coinaly.io',
      password: 'testtest'
    })
    component.find('form').trigger('submit')

    const redirectMock = jest.fn()
    const dispatchLoginMock = jest.fn()

    component.setMethods({
      dispatchLogin: dispatchLoginMock,
      redirect: redirectMock
    })
    await flushPromises()
    expect(redirectMock.mock.calls).toHaveLength(1)
  })

  it('should disable the form when loading', () => {
    store.commit('auth/startLoading')
    expect(component.vm.isDisabled).toBe(true)
    expect(component.find('form fieldset').attributes().disabled).toBe('disabled')
    store.commit('auth/stopLoading')
    expect(component.find('form fieldset').attributes().disabled).toBe(undefined)
  })

  it('should disable the form when authenticated', () => {
    store.commit('auth/setAuthenticated')
    expect(component.vm.isDisabled).toBe(true)
    expect(component.find('form fieldset').attributes().disabled).toBe('disabled')
    store.commit('auth/unsetAuthenticated')
    expect(component.find('form fieldset').attributes().disabled).toBe(undefined)
  })

  it('should render an error when authentication gives an error', () => {
    const exampleError = 'Example error'
    store.commit('auth/setError', exampleError)
    expect(component.vm.error).toBe(exampleError)
    expect(component.find('.alert').text()).toBe(exampleError)
    store.commit('auth/removeError')
  })

  it('should render the correct default label', () => {
    expect(component.vm.submitLabel).toBe('Login')
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
