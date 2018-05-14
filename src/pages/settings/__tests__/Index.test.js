import PageSettingsIndex from '@/pages/settings/Index.vue'
import { shallowMount } from '@vue/test-utils'

describe('pages/settings/Index.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(PageSettingsIndex, {
      stubs: ['router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
