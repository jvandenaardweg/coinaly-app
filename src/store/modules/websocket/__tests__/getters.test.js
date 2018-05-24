import getters from '@/store/modules/websocket/getters'
import state from '@/store/modules/websocket/state'

describe('modules/websocket/getters.js', () => {
  it('getter error should return an error message', () => {
    state.events.error = {
      code: 1006,
      message: 'Socket hung up',
      name: 'SocketProtocolError'
    }
    expect(getters.error(state).code).toBe(1006)
    expect(getters.error(state).message).toBe('Socket hung up')
  })

  it('getter isDelayed should return a boolean value', () => {
    state.isDelayed = true
    expect(getters.isDelayed(state)).toBe(true)
  })

  it('getter delayTimeout should return a number in milliseconds', () => {
    state.delayTimeout = 10000
    expect(getters.delayTimeout(state)).toBe(10000)
  })
})
