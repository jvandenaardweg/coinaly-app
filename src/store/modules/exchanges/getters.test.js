import getters from '@/store/modules/exchanges/getters'
import state from '@/store/modules/exchanges/state'

describe('modules/exchanges/getters.js', () => {
  it('getter selected should return the selected exchange', () => {
    state.selected = 'bittrex'
    expect(getters.selected(state)).toBe('bittrex')
  })

  it('getter selectedName should return the selected exchange name', () => {
    state.selected = 'bittrex'
    expect(getters.selectedName(state)).toBe('Bittrex')
  })
})
