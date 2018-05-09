import nock from 'nock'
import actions from '@/store/modules/prices/actions'

import mockPrices from '@/mocks/prices.json'

const context = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: jest.fn()
}

describe('modules/prices/actions.js', () => {
  it('action getAllPrices should store all prices', async (done) => {
    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get('/prices')
      .reply(200, mockPrices)

    const result = await actions.getAllPrices(context)
    expect(result).toMatchObject(mockPrices)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('removeError')
    expect(context.commit).toHaveBeenCalledWith('addAll', mockPrices)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })
})
