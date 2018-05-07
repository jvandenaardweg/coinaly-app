import nock from 'nock'
import actions from '@/store/modules/keys/actions'

import mockKeys from '@/mocks/keys.json'
import mockKeysCreate from '@/mocks/keys-create.json'

const context = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: jest.fn()
}

describe('modules/keys/actions.js', () => {
  it('action getAllKeys should store all keys', async (done) => {
    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get('/keys')
      .reply(200, mockKeys)

    const result = await actions.getAllKeys(context)
    expect(result).toMatchObject(mockKeys)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('removeError')
    expect(context.commit).toHaveBeenCalledWith('addAll', mockKeys)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })

  it('action createKey should create the API key for the user in the database', async (done) => {
    const payload = {
      apiKey: 'xxxxxx',
      apiSecret: 'xxxxxx',
      exchangeId: 1
    }

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .post('/keys')
      .reply(200, mockKeysCreate)

    const result = await actions.createKey(context, payload)
    expect(result).toMatchObject(mockKeysCreate)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('removeError')
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })
})
