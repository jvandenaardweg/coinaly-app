import * as api from '@/api/orders'
import nock from 'nock'

import mockOrdersClosed from '@/mocks/orders-closed.json'
import mockOrdersOpen from '@/mocks/orders-open.json'
import mockOrdersCreated from '@/mocks/orders-created.json'
import mockOrdersDelete from '@/mocks/orders-delete.json'

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

  it('createLimitOrder should create a new limit order', async () => {
    const exchangeSlug = 'bittrex'

    const payload = {
      side: 'buy',
      symbol: 'BTC/USDT',
      amount: 10,
      price: 7200.12
    }

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .post(`/exchanges/${exchangeSlug}/orders/limit`, payload)
      .reply(200, mockOrdersCreated) // TODO: Check with real API what we get back after creating an order

    const result = await api.createLimitOrder(exchangeSlug, payload.side, payload.symbol, payload.amount, payload.price)
    expect(result).toMatchObject(mockOrdersCreated)
  })

  // TODO: Make this work, probably better to use Fetch?
  // it('cancelOrder should cancel an order on the exchange', async () => {
  //   const exchangeSlug = 'bittrex'
  //   const orderUuid = '2a116a0d-3cde-4350-9c45-955e29ca2dc3'

  //   nock('http://localhost:5000')
  //     .defaultReplyHeaders({
  //       'access-control-allow-origin': '*',
  //       'access-control-allow-credentials': 'true'
  //     })
  //     .delete(`/exchanges/${exchangeSlug}/orders/${orderUuid}`)
  //     .reply(200, mockOrdersDelete)

  //   const result = await api.cancelOrder(exchangeSlug, orderUuid)
  //   expect(result).toMatchObject(mockOrdersDelete)
  // })
})
