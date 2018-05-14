import { shallowMount } from '@vue/test-utils'
import Logo from '@/components/Logo.vue'

describe('components/Logo.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(Logo)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('renders a correct default fill color', () => {
    expect(component.vm.fillColor).toBe('#ffffff')
  })

  it('renders a correct default width', () => {
    expect(component.vm.width).toBe(40)
  })

  it('renders a correct default height', () => {
    expect(component.vm.height).toBe(40)
  })

  it('renders a correct custom fill color', () => {
    component.setProps({
      fill: '#000000'
    })
    expect(component.vm.fillColor).toBe('#000000')
  })

  it('renders a correct custom height', () => {
    component.setProps({
      size: 100
    })
    expect(component.vm.height).toBe(100)
  })

  it('renders a correct custom width', () => {
    component.setProps({
      size: 100
    })
    expect(component.vm.width).toBe(100)
  })


})
