// import { shallow } from '@vue/test-utils'
import ListGroupItemMarket from '@/components/list-group-item/Market.vue'
import { shallow } from '@vue/test-utils'
import '@/filters'

import marketMock from '@/mocks/market.json'

describe('components/list-group-item/Market.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(ListGroupItemMarket, {
      stubs: ['router-link', 'router-view'],
      propsData: {
        market: marketMock['BTC/USDT']
      }
    })
  })
  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
