// import { shallowMount } from '@vue/test-utils'
import PartialEmpty from '@/components/card/PartialEmpty.vue'
import { shallowMount } from '@vue/test-utils'

const sampleEmptyText = 'This is empty...'

describe('components/card/PartialEmpty.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(PartialEmpty, {
      stubs: ['router-link', 'router-view'],
      propsData: {
        text: sampleEmptyText
      }
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('renders the correct text when empty', () => {
    expect(component.text()).toBe(sampleEmptyText)
  })

  // it('renders an action button when given a link and label', () => {
  //   component.setProps({
  //     actionLink: '/sell',
  //     actionLabel: 'Go back'
  //   })
  //   const button = component.find('.btn')
  //   expect(component.text()).toBe('lol')
  //   expect(button.text()).toBe('Go back')
  //   expect(button.attributes().href).toBe('/sell')
  // })

  it('does not render when text is not set', () => {
    component.setProps({
      text: null
    })
    expect(component.isEmpty()).toBe(true)
  })
})
