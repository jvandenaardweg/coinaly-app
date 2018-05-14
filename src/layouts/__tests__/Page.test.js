import { shallowMount } from '@vue/test-utils'
import Page from '@/layouts/Page.vue'

describe('layouts/Page.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(Page, {
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
