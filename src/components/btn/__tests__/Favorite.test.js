import BtnFavorite from '@/components/btn/Favorite.vue'
import { shallowMount } from '@vue/test-utils'

describe('components/btn/Favorite.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(BtnFavorite)
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('should return an active color when it is favorited', () => {
    component.setProps({
      active: true
    })
    expect(component.vm.active).toBe(true)
    expect(component.vm.fillColor).toBe('#ffb53f')
    expect(component.vm.strokeColor).toBe('#ffb53f')
  })

  it('should return the fill color correctly', () => {
    component.setProps({
      fill: '#ffffff'
    })
    expect(component.vm.fillColor).toBe('#ffffff')
  })

  it('should return the stroke color correctly', () => {
    component.setProps({
      stroke: '#ffffff'
    })
    expect(component.vm.strokeColor).toBe('#ffffff')
  })

  it('should return the correct default stroke and fill color correctly', () => {
    expect(component.vm.strokeColor).toBe('#ccc')
    expect(component.vm.fillColor).toBe('#ccc')
  })
})
