import nock from 'nock'
import actions from '@/store/modules/exchanges/actions'

import mockExchangesAll from '@/mocks/exchanges-all.json'

const context = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: jest.fn()
}

describe('modules/exchanges/actions.js', () => {
  it('action getAllExchanges should store all exchanges', async (done) => {
    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get('/exchanges')
      .reply(200, mockExchangesAll)

    const result = await actions.getAllExchanges(context)
    expect(result).toMatchObject(mockExchangesAll)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('addAll', mockExchangesAll)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })
})
