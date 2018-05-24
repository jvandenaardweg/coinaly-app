import mutations from '@/store/modules/websocket/mutations'
import state from '@/store/modules/websocket/state'
import initialState from '@/store/modules/websocket/initialState'

const exampleEventPlayload = {
  eventName: 'connect',
  eventData: {
    id: '1DypewgS0fEFk-98AABX'
  }
}

describe('modules/websocket/mutations.js', () => {
  it('setEventOutput sets state.events[eventName] to the output we get from websocket events', () => {
    mutations.setEventOutput(state, exampleEventPlayload)
    expect(state.events[exampleEventPlayload.eventName]).toMatchObject(exampleEventPlayload.eventData)
  })

  it('mutation removeEventOutput should remove the object from a websocket event', () => {
    mutations.removeEventOutput(state, exampleEventPlayload.eventName)
    expect(state.events[exampleEventPlayload.eventName]).toMatchObject({})
  })

  it('mutation unsubscribe should set state.subscribed to null', () => {
    mutations.unsubscribe(state)
    expect(state.subscribed).toBe(null)
  })

  it('mutation subscribe should set state.subscribed to a channel name', () => {
    mutations.subscribe(state, 'TICKERS-BITTREX-NEW')
    expect(state.subscribed).toBe('TICKERS-BITTREX-NEW')
  })

  it('mutation watch should set state.watching to a channel name', () => {
    mutations.watch(state, 'TICKERS-BITTREX-NEW')
    expect(state.watching).toBe('TICKERS-BITTREX-NEW')
  })

  it('mutation unwatch should set state.watching to null', () => {
    mutations.unwatch(state)
    expect(state.watching).toBe(null)
  })

  it('mutation setDelayed should set state.isDelayed to true', () => {
    mutations.setDelayed(state)
    expect(state.isDelayed).toBe(true)
  })

  it('mutation removeDelayed should set state.isDelayed to false', () => {
    mutations.removeDelayed(state)
    expect(state.isDelayed).toBe(false)
  })

  it('mutation resetState should set state to its default values', () => {
    mutations.setDelayed(state) // Fill the store with something
    mutations.resetState(state)
    expect(state).toMatchObject(initialState())
  })
})
