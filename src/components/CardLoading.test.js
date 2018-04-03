import { shallow } from '@vue/test-utils'
import CardLoading from '@/components/CardLoading.vue'

const sampleLoadingText = 'Currently loading data...'

describe('components/CardLoading.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(CardLoading, {
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
