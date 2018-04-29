import nock from 'nock'
import actions from '@/store/modules/currencies/actions'

import mockCurrencies from '@/mocks/currencies.json'

const context = {
  commit: jest.fn()
}

describe('modules/currencies/actions.js', () => {
  it('action getAll should set all currencies from the API', async (done) => {
    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get('/currencies')
      .reply(200, mockCurrencies)

    const result = await actions.getAll(context, false)
    expect(result).toMatchObject(mockCurrencies)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('addAll', mockCurrencies)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })
})
