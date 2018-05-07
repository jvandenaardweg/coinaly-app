import * as api from '@/api/exchanges'
import nock from 'nock'

import mockExchangesAll from '@/mocks/exchanges-all.json'

describe('api/exchanges.js', () => {
  it('getAllExchanges should reply with an array of exchanges', async () => {
    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get('/exchanges/all')
      .reply(200, mockExchangesAll)

    const result = await api.getAllExchanges()
    expect(result).toMatchObject(mockExchangesAll)
  })
})
