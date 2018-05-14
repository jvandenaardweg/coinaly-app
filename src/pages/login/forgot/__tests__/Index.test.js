import PageLoginForgotIndex from '@/pages/login/forgot/Index.vue'
import { shallowMount } from '@vue/test-utils'

describe('pages/login/forgot/Index.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(PageLoginForgotIndex)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
