import { shallow } from '@vue/test-utils'
import PageMarketsQuote from '@/pages/markets/quote/Index.vue'

describe('pages/markets/quote/Index.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(PageMarketsQuote, {
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
