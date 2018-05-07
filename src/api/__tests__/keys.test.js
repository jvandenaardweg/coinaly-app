import * as api from '@/api/keys'
import nock from 'nock'

import mockKeys from '@/mocks/keys.json'

describe('api/keys.js', () => {
  it('getAllKeys should reply with an array of keys', async () => {
    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get('/keys')
      .reply(200, mockKeys)

    const result = await api.getAllKeys()
    expect(result).toMatchObject(mockKeys)
  })
})
