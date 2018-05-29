import * as api from '@/api/orders'
import nock from 'nock'

import mockOrdersClosed from '@/mocks/orders-closed.json'
import mockOrdersOpen from '@/mocks/orders-open.json'

describe('api/orders.js', () => {
  it('getAllClosedOrders should reply with an array of closed orders', async () => {
    const exchangeSlug = 'bittrex'

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get(`/exchanges/${exchangeSlug}/orders/closed`)
      .reply(200, mockOrdersClosed)

    const result = await api.getAllClosedOrders(exchangeSlug)
    expect(result).toMatchObject(mockOrdersClosed)
  })

  it('getAllOpenOrders should reply with an array of open orders', async () => {
    const exchangeSlug = 'bittrex'

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get(`/exchanges/${exchangeSlug}/orders/open`)
      .reply(200, mockOrdersOpen)

    const result = await api.getAllOpenOrders(exchangeSlug)
    expect(result).toMatchObject(mockOrdersOpen)
  })
})
