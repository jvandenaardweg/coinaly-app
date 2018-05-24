import state from '@/store/modules/websocket/state'

describe('modules/websocket/state.js', () => {
  it('state has the correct initial state', () => {
    expect(typeof state.events).toBe('object')
    expect(state.watching).toBe(null)
    expect(state.subscribed).toBe(null)
    expect(state.socket).toBe(null)
    expect(state.isDelayed).toBe(false)
    expect(state.delayTimeout).toBe(10000)
  })
})
