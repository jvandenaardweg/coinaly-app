import getters from '@/store/modules/orders/getters'
import state from '@/store/modules/orders/state'

import mockOrdersClosed from '@/mocks/orders-closed.json'

describe('modules/orders/getters.js', () => {

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

  it('getter closed should return the orders if state.closed is set', () => {
    state.closed = mockOrdersClosed
    expect(getters.closed(state)).toMatchObject(mockOrdersClosed)
  })

  it('getter hasClosed should return true if state.closed is set', () => {
    state.closed = mockOrdersClosed
    expect(getters.hasClosed(state)).toBe(true)
  })

  it('getter hasClosed should return false if state.closed is not set', () => {
    state.closed = null
    expect(getters.hasClosed(state)).toBe(false)
  })

})
