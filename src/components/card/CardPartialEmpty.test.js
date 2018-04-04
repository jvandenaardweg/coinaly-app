// import { shallow } from '@vue/test-utils'
import CardPartialEmpty from '@/components/card/CardPartialEmpty.vue'
import { shallow } from '@vue/test-utils'

const sampleEmptyText = 'This is empty...'

describe('components/card/CardPartialEmpty.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(CardPartialEmpty, {
      stubs: ['router-link', 'router-view'],
      propsData: {
        isEmpty: true,
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

  it('does not render when not empty', () => {
    component.setProps({
      isEmpty: false
    })
    expect(component.isEmpty()).toBe(true)
  })
})
