import * as api from '@/api/symbols'
import nock from 'nock'

import mockSymbols from '@/mocks/symbols.json'

describe('api/symbols.js', () => {
  it('should reply with a symbols object', async () => {
    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get('/symbols')
      .reply(200, mockSymbols)

    const result = await api.getAllSymbols(false)
    expect(result).toMatchObject(mockSymbols)
  })
})
