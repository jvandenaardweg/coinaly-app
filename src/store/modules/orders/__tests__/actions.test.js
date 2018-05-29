import nock from 'nock'
import actions from '@/store/modules/orders/actions'

import mockOrdersClosed from '@/mocks/orders-closed.json'
import mockOrdersOpen from '@/mocks/orders-open.json'
import mockOrdersCreated from '@/mocks/orders-created.json'

const context = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: jest.fn(),
  rootGetters: {
    'exchanges/selected': 'bittrex'
  }
}

describe('modules/orders/actions.js', () => {
  it('action getAllClosedOrders should store all closed orders', async (done) => {
    const exchangeSlug = 'bittrex'

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get(`/exchanges/${exchangeSlug}/orders/closed`)
      .reply(200, mockOrdersClosed)

    const result = await actions.getAllClosedOrders(context)
    expect(result).toMatchObject(mockOrdersClosed)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('removeError')
    expect(context.commit).toHaveBeenCalledWith('addAllClosed', mockOrdersClosed)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })

  it('action getAllOpenOrders should store all open orders', async (done) => {
    const exchangeSlug = 'bittrex'

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get(`/exchanges/${exchangeSlug}/orders/open`)
      .reply(200, mockOrdersOpen)

    const result = await actions.getAllOpenOrders(context)
    expect(result).toMatchObject(mockOrdersOpen)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('removeError')
    expect(context.commit).toHaveBeenCalledWith('addAllOpen', mockOrdersOpen)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })

  it('action createLimitOrder should create a new limit order', async (done) => {
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
      .reply(200, mockOrdersCreated)

    const result = await actions.createLimitOrder(context, payload)
    expect(result).toMatchObject(mockOrdersCreated)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('removeError')
    // expect(context.commit).toHaveBeenCalledWith('addAllOpen', mockOrdersCreated)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })
})
