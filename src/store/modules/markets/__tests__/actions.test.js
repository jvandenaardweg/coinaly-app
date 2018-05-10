import nock from 'nock'
import actions from '@/store/modules/markets/actions'

import marketsMock from '@/mocks/markets.json'

const selectedExchange = 'bittrex'

const context = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: jest.fn(),
  rootGetters: {
    'exchanges/selected': selectedExchange
  }
}

describe('modules/markets/actions.js', () => {
  it('action loadAll should store all markets', async (done) => {


    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get(`/exchanges/${selectedExchange}/markets/load`)
      .reply(200, marketsMock)

    const result = await actions.loadAll(context, selectedExchange)
    expect(result).toMatchObject(marketsMock)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('addAll', marketsMock)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })
})
