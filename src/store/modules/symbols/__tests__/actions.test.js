import nock from 'nock'
import actions from '@/store/modules/symbols/actions'

import mockSymbols from '@/mocks/symbols.json'

const context = {
  commit: jest.fn()
}

describe('modules/symbols/actions.js', () => {
  it('action getAll should set all symbols from the API', async (done) => {
    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get('/symbols')
      .reply(200, mockSymbols)

    const result = await actions.getAll(context, false)
    expect(result).toMatchObject(mockSymbols)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('addAll', mockSymbols)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })
})
