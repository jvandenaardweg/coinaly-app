import nock from 'nock'
import actions from '@/store/modules/orders/actions'

import mockOrdersClosed from '@/mocks/orders-closed.json'

const context = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: jest.fn()
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

    const result = await actions.getAllClosedOrders(context, exchangeSlug)
    expect(result).toMatchObject(mockOrdersClosed)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('removeError')
    expect(context.commit).toHaveBeenCalledWith('addAllClosed', mockOrdersClosed)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })
})
