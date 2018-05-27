import * as api from '@/api/prices'
import nock from 'nock'

import mockPrices from '@/mocks/prices.json'
import mockPricesHistory from '@/mocks/prices-history.json'

const exampleBaseId = 'BTC'
const exampleQuoteId = 'USD'
const exampleInterval = '1m'

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

  it('getAllPricesHistory should reply with an array of prices', async () => {
    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get(`/prices/history`)
      .query({
        baseId: exampleBaseId,
        quoteId: exampleQuoteId,
        interval: exampleInterval
      })
      .reply(200, mockPricesHistory)

    const result = await api.getAllPricesHistory(exampleBaseId, exampleQuoteId, exampleInterval)
    expect(result).toMatchObject(mockPricesHistory)
  })
})
