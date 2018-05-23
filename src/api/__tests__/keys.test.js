import * as api from '@/api/keys'
import nock from 'nock'

import mockKeys from '@/mocks/keys.json'
import mockKeysCreate from '@/mocks/keys-create.json'
import mockKeysUpdate from '@/mocks/keys-update.json'

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

  it('createKey should reply with an success message', async () => {
    const payload = {
      apiKey: '123456789asdasasdasa',
      apiSecret: '123123sadasdad123123',
      exchangeId: 1
    }

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .post('/keys', payload)
      .reply(200, mockKeysCreate)

    const result = await api.createKey(payload.apiKey, payload.apiSecret, payload.exchangeId)
    expect(result).toMatchObject(mockKeysCreate)
  })
})
