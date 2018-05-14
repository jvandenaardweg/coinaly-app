import { shallowMount } from '@vue/test-utils'
import Search from '@/components/Search.vue'

describe('components/Search.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(Search)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('should emit the searchquery when keyup on input is triggered', () => {
    component.vm.searchQuery = 'bitcoin'
    component.find('input').trigger('keyup')
    expect(component.emitted().search[0][0]).toBe('bitcoin')
  })

  it('should set the correct placeholder when given as a prop', () => {
    component.setProps({
      placeholder: 'Do your search...'
    })
    expect(component.vm.placeholderLabel).toBe('Do your search...')
  })

  it('renders the correct placeholder when given as a prop', () => {
    component.setProps({
      placeholder: 'Do your search...'
    })
    expect(component.find('input').attributes().placeholder).toBe('Do your search...')
  })

  it('should set the correct default placeholder', () => {
    expect(component.vm.placeholderLabel).toBe('Search...')
  })

  it('renders the correct default placeholder', () => {
    expect(component.find('input').attributes().placeholder).toBe('Search...')
  })
})
