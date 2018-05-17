import PageFooter from '@/components/PageFooter.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe('components/PageFooter.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(PageFooter, {
      localVue,
      router
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('renders the correct required links', () => {
    expect(component.findAll('a').at(0).attributes().href).toBe('#/privacy-policy')
    expect(component.findAll('a').at(1).attributes().href).toBe('#/terms-of-use')
    expect(component.findAll('a').at(2).attributes().href).toBe('#/contact')
  })
})
