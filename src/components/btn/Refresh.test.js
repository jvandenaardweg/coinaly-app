import BtnRefresh from '@/components/btn/Refresh.vue'
import { shallow } from '@vue/test-utils'

describe('components/btn/Refresh.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(BtnRefresh)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  // it('should show correct loading label when loading', () => {
  //   component.vm.isLoading = true
  //   expect(component.vm.refreshLabel).toBe(true)
  // })


})
