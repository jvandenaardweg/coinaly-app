import { shallowMount } from '@vue/test-utils'
import CardPartialLoading from '@/components/card/CardPartialLoading.vue'

const sampleLoadingText = 'Currently loading data...'

describe('components/card/CardPartialLoading.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(CardPartialLoading, {
      propsData: {
        isLoading: true,
        text: sampleLoadingText
      }
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('renders the correct text when loading', () => {
    expect(component.text()).toBe(sampleLoadingText)
  })

  it('does not render when not loading', () => {
    component.setProps({
      isLoading: false
    })
    expect(component.isEmpty()).toBe(true)
  })
})
