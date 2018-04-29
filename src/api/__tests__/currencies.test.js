import * as api from '@/api/currencies'
import nock from 'nock'

import mockCurrencies from '@/mocks/currencies.json'

describe('api/currencies.js', () => {
  it('should reply with a currencies object', async () => {
    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get('/currencies')
      .reply(200, mockCurrencies)

    const result = await api.getAllCurrencies(false)
    expect(result).toMatchObject(mockCurrencies)
  })
})
