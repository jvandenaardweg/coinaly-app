import PageLoginIndex from '@/pages/login/Index.vue'
import { shallowMount } from '@vue/test-utils'

describe('pages/login/Index.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(PageLoginIndex)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
