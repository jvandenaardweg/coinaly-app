import { shallowMount } from '@vue/test-utils'
import SignupSuccess from '@/components/card/SignupSuccess.vue'

describe('components/card/SignupSuccess.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(SignupSuccess, {
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
