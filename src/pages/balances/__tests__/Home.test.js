import PageBalancesHome from '@/pages/balances/Home.vue'
import { shallow } from '@vue/test-utils'

describe('pages/balances/Home.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(PageBalancesHome, {
      stubs: ['router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
