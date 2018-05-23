import * as api from '@/api/deposits'
import nock from 'nock'

import depositsAddressMock from '@/mocks/deposits-address.json'

describe('api/keys.js', () => {
  it('getDepositAddress should reply with an object', async () => {
    const exampleExchange = 'bittrex'
    const exampleSymbolId = 'BTC'

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get(`/exchanges/${exampleExchange}/deposits/address`)
      .query({
        symbolId: exampleSymbolId,
        forceRefresh: false
      })
      .reply(200, depositsAddressMock)

    const result = await api.getDepositAddress(exampleSymbolId, exampleExchange)
    expect(result).toMatchObject(depositsAddressMock)
  })
})
