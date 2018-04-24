import * as api from '@/api/markets'
import nock from 'nock'

import mockMarkets from '@/mocks/markets.json'

describe('api/markets.js', () => {
  it('should reply with a markets object', async () => {
    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get('/exchanges/bittrex/markets/load')
      .reply(200, mockMarkets)

    const result = await api.loadAllMarkets(false, 'bittrex')
    expect(result).toMatchObject(mockMarkets)
  })
})
