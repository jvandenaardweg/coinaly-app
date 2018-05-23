import nock from 'nock'
import actions from '@/store/modules/markets/actions'

import marketsMock from '@/mocks/markets.json'
import marketsOHLCV1dMock from '@/mocks/markets-ohlcv-1d.json'

const selectedExchange = 'bittrex'

const context = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: jest.fn(),
  rootGetters: {
    'exchanges/selected': selectedExchange
  }
}

describe('modules/markets/actions.js', () => {
  it('action loadAll should store all markets', async (done) => {
    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get(`/exchanges/${selectedExchange}/markets/load`)
      .query({
        forceRefresh: false
      })
      .reply(200, marketsMock)

    const result = await actions.loadAll(context, selectedExchange)
    expect(result).toMatchObject(marketsMock)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('addAll', marketsMock)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })

  it('action getOHLCV should store OHLCV data per market symbol', async (done) => {
    const payload = {
      marketSymbol: 'BTC/USDT',
      interval: '1d',
      forceRefresh: false
    }

    const expectedCommit = {
      marketSymbol: 'BTC/USDT',
      interval: '1d',
      data: marketsOHLCV1dMock
    }

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get(`/exchanges/${selectedExchange}/markets/ohlcv`)
      .query({
        ...payload
      })
      .reply(200, marketsOHLCV1dMock)

    const result = await actions.getOHLCV(context, payload)
    expect(result).toMatchObject(marketsOHLCV1dMock)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('addOHLCV', expectedCommit)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })
})
