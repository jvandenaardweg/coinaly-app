import nock from 'nock'
import actions from '@/store/modules/deposits/actions'
import depositsAddressMock from '@/mocks/deposits-address.json'

const selectedExchange = 'bittrex'

const context = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: jest.fn(),
  rootGetters: {
    'exchanges/selected': selectedExchange
  }
}

describe('modules/deposits/actions.js', () => {
  const payload = {
    symbolId: 'BTC',
    forceRefresh: false
  }

  it('action getDepositAddress should get a deposit address from a given symbolId', async (done) => {
    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get(`/exchanges/${selectedExchange}/deposits/address`)
      .query({
        symbolId: payload.symbolId,
        forceRefresh: payload.forceRefresh
      })
      .reply(200, depositsAddressMock)

    const result = await actions.getDepositAddress(context, payload)
    expect(result).toMatchObject(depositsAddressMock)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('removeError')
    expect(context.commit).toHaveBeenCalledWith('addAddress', depositsAddressMock)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })
})
