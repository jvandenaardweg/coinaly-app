import BtnSync from '@/components/btn/Sync.vue'
import { shallowMount } from '@vue/test-utils'

describe('components/btn/Sync.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(BtnSync)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
