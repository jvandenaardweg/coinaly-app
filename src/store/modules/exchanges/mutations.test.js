import mutations from '@/store/modules/exchanges/mutations'
import state from '@/store/modules/exchanges/state'

describe('modules/exchanges/mutations.js', () => {
  it('setSelected sets selected exchange', () => {
    mutations.setSelected(state, 'Bittrex')
    expect(state.selected).toBe('bittrex')
  })
})
