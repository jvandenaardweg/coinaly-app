import store from '../index'

describe('modules/exchanges.js', () => {
  it('getter should return the selected exchange', () => {
    store.commit('exchanges/setSelected', 'bittrex')
    expect(store.getters['exchanges/selected']).toBe('bittrex')

    store.commit('exchanges/setSelected', 'binance')
    expect(store.getters['exchanges/selected']).toBe('binance')
  })

  it('getter should return the selected exchange name', () => {
    store.commit('exchanges/setSelected', 'bittrex')
    expect(store.getters['exchanges/selectedName']).toBe('Bittrex')

    store.commit('exchanges/setSelected', 'binance')
    expect(store.getters['exchanges/selectedName']).toBe('Binance')
  })
})