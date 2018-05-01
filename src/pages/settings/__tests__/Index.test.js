import PageSettingsIndex from '@/pages/settings/Index.vue'
import { shallow } from '@vue/test-utils'

describe('pages/settings/Index.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(PageSettingsIndex, {
      stubs: ['router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
