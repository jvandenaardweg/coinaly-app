import { shallow } from '@vue/test-utils'
import CardTrade from '@/components/card/CardTrade.vue'

describe('components/card/CardTrade.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(CardTrade)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
