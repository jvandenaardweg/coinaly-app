import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
import DeleteAccount from '@/components/btn/DeleteAccount.vue'

import userModule from '@/store/modules/user'
import authModule from '@/store/modules/auth'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('components/btn/DeleteAccount.vue', () => {
    let component
    let store
  
    beforeEach(() => {
      store = new Vuex.Store({
        modules: {
          user: userModule,
          auth: authModule
        }
      })
  
      component = shallowMount(DeleteAccount, {
        store,
        localVue,
        stubs: ['router-link', 'router-view']
      })
    })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('should call method handleClick when clicked', async () => {

    const handleClickMock = jest.fn()
    component.setMethods({ handleClick: handleClickMock })

    component.find('button').trigger('click')
    await flushPromises()
    expect(handleClickMock.mock.calls).toHaveLength(1)
  })

  it('should run dispatchDeleteAccount when user confirmed all windows', async () => {
    global.confirm = () => true
    window.confirm = jest.fn(() => true)

    const dispatchDeleteAccountMock = jest.fn()
    const dispatchLogoutMock = jest.fn()

    component.setMethods({
      dispatchDeleteAccount: dispatchDeleteAccountMock,
      dispatchLogout: dispatchLogoutMock 
    })

    component.find('button').trigger('click')
    await flushPromises()
    expect(window.confirm).toBeCalled()
    expect(dispatchDeleteAccountMock.mock.calls).toHaveLength(1)
    expect(dispatchLogoutMock.mock.calls).toHaveLength(1)
  })

})
