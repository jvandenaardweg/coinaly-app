import { shallow } from '@vue/test-utils'
import PercentageBadge from '@/components/PercentageBadge.vue'
import '../filters'

describe('components/Search.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(PercentageBadge)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('should set the correct percentage when given as a prop', () => {
    component.setProps({
      percentage: 10.25
    })
    expect(component.vm.percentage).toBe(10.25)
  })

  it('renders the correct percentage when given as a prop', () => {
    component.setProps({
      percentage: 10.25
    })
    expect(component.text()).toBe('10.25%')
  })

  it('should set the correct color class', () => {
    component.setProps({ percentage: 10 })
    expect(component.vm.colorClass).toBe('bg-success')
    component.setProps({ percentage: 0.01 })
    expect(component.vm.colorClass).toBe('bg-success')

    component.setProps({ percentage: 0 })
    expect(component.vm.colorClass).toBe('bg-light')

    component.setProps({ percentage: -10 })
    expect(component.vm.colorClass).toBe('bg-danger')
  })

  it('renders set the correct color class', () => {
    component.setProps({ percentage: 10 })
    expect(component.classes()).toContain('bg-success')
    component.setProps({ percentage: 0.01 })
    expect(component.classes()).toContain('bg-success')

    component.setProps({ percentage: 0 })
    expect(component.classes()).toContain('bg-light')

    component.setProps({ percentage: -10 })
    expect(component.classes()).toContain('bg-danger')
  })
})
