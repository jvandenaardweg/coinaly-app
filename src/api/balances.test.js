import * as api from '@/api/balances'
import nock from 'nock'

import mockBalances from '@/mocks/balances.json'

describe('api/balances.js', () => {
  it('should reply with a balances object', async () => {
    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get('/exchanges/bittrex/balances')
      .reply(200, mockBalances)

    const result = await api.getAllBalances(false, 'bittrex')
    expect(result).toMatchObject(mockBalances)
  })
})
