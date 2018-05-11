import * as api from '@/api/keys'
import nock from 'nock'
import moxios from 'moxios'

import mockKeys from '@/mocks/keys.json'
import mockKeysCreate from '@/mocks/keys-create.json'
import mockKeysUpdate from '@/mocks/keys-update.json'

describe('api/keys.js', () => {
  // beforeEach(function () {
  //   // import and pass your custom axios instance to this method
  //   moxios.install()
  // })

  // afterEach(function () {
  //   // import and pass your custom axios instance to this method
  //   moxios.uninstall()
  // })

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

  // it('updateKey should reply with an success message', async (done) => {
  //   const payload = {
  //     apiKey: '123456789asdasasdasa',
  //     apiSecret: '123123sadasdad123123',
  //     exchangeId: 1
  //   }

  //   // nock('http://localhost:5000')
  //   //   .defaultReplyHeaders({
  //   //     'access-control-allow-origin': '*',
  //   //     'access-control-allow-credentials': 'true'
  //   //   })
  //   //   .patch('/keys', payload)
  //   //   .reply(200, mockKeysUpdate)
  //   moxios.wait(function () {
  //     let request = moxios.requests.mostRecent()
  //     request.respondWith({
  //       status: 200,
  //       response: mockKeysUpdate
  //     }).then(function () {
  //       expect(result).toMatchObject(mockKeysUpdate)
  //       done()
  //     })
  //   }) 
  //   const result = await api.updateKey(payload.apiKey, payload.apiSecret, payload.exchangeId)

       
  // })
})
