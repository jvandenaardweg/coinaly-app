import * as api from '@/api/prices'
import nock from 'nock'

import mockPrices from '@/mocks/prices.json'

describe('api/prices.js', () => {
  it('getAllPrices should reply with an object of prices', async () => {
    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get(`/prices`)
      .reply(200, mockPrices)

    const result = await api.getAllPrices()
    expect(result).toMatchObject(mockPrices)
  })
})
