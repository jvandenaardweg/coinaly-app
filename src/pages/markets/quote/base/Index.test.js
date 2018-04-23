import { shallow } from '@vue/test-utils'
import PageMarketsMarket from '@/pages/markets/quote/base/Index.vue'

describe('pages/markets/quote/base/Index.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(PageMarketsMarket, {
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
