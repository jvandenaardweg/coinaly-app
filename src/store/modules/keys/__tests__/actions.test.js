import nock from 'nock'
import actions from '@/store/modules/keys/actions'

import mockKeys from '@/mocks/keys.json'

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
    expect(context.commit).toHaveBeenCalledWith('addAll', mockKeys)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })
})
