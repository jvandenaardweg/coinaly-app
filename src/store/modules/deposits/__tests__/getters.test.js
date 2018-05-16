import getters from '@/store/modules/deposits/getters'
import state from '@/store/modules/deposits/state'

import depositsAddressMock from '@/mocks/deposits-address.json'

describe('modules/deposits/getters.js', () => {

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

  it('getter success should return a success message if state.success is set', () => {
    state.success = 'Sample success message'
    expect(getters.success(state)).toBe('Sample success message')
  })

  it('getter addresses should return an object with addresses if state.addresses is set', () => {
    state.addresses = depositsAddressMock
    expect(getters.addresses(state)).toMatchObject(depositsAddressMock)
  })

})
