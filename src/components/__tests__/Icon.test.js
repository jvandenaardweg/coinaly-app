import { shallowMount } from '@vue/test-utils'
import Icon from '@/components/Icon.vue'

describe('components/Icon.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(Icon)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('renders an SVG icon when given name prop', () => {
    component.setProps({
      name: 'download'
    })
    const svg = component.find('svg')
    expect(svg.classes()).toContain('feather-download')
  })

  it('renders a correctly colored icon', () => {
    component.setProps({
      name: 'download',
      fill: '#ffffff',
      stroke: '#ffffff'
    })
    const svg = component.find('svg')
    expect(svg.attributes().fill).toBe('#ffffff')
    expect(svg.attributes().stroke).toBe('#ffffff')
  })
})
