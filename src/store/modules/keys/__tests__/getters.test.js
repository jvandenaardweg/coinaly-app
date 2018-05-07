import getters from '@/store/modules/keys/getters'
import state from '@/store/modules/keys/state'

import keysMock from '@/mocks/keys.json'

describe('modules/keys/getters.js', () => {

  it('getter isLoading should return true when state.isLoading is true', () => {
    state.isLoading = true
    expect(getters.isLoading(state)).toBe(true)
  })

  it('getter isLoading should return false when state.isLoading is false', () => {
    state.isLoading = false
    expect(getters.isLoading(state)).toBe(false)
  })

  it('getter error should return a error message if state.error is set', () => {
    state.error = 'Sample error message'
    expect(getters.error(state)).toBe('Sample error message')
  })

  it('getter keys should return an array of keys if state.error is set', () => {
    state.keys = keysMock
    expect(getters.keys(state)).toMatchObject(keysMock)
  })

})
