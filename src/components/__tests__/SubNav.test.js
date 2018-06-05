import { shallowMount } from '@vue/test-utils'
import SubNav from '@/components/SubNav.vue'

describe('components/SubNav.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(SubNav, {
      props: {
        items: []
      },
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  // it('renders multiple tabs when given items prop', () => {
  //   component.setProps({
  //     items: items
  //   })
  //   const tabItems = component.find('.selectgroup-item')
  //   expect(tabItems.exists()).toBe(true)
  // })
})

const items = [
  {
    label: 'Account',
    slug: 'account'
  },
  {
    label: 'Exchanges',
    slug: 'exchanges'
  }
]
