import PageSettingsExchangesEdit from '@/pages/settings/exchanges/Edit.vue'
import { shallow } from '@vue/test-utils'

describe('pages/settings/Edit.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(PageSettingsExchangesEdit, {
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
