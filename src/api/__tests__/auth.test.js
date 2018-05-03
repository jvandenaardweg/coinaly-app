import * as api from '@/api/auth'
import nock from 'nock'

import mockAuthLogin from '@/mocks/auth-login.json'
import mockAuthVerify from '@/mocks/auth-verify.json'

describe('api/auth.js', () => {

  afterEach(() => {
    nock.cleanAll()
  })

  it('should reply with a token and user object on success', async () => {
    const examplePayload = {
      email: 'jordyvandenaardweg@gmail.com',
      password: 'testtest'
    }

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .post('/auth/login', examplePayload)
      .reply(200, mockAuthLogin)

    const result = await api.login(examplePayload.email, examplePayload.password)
    expect(result).toMatchObject(mockAuthLogin)
  })

  it('verify should return a 200 when succeed', async () => {
    const examplePayload = {
      verification: '1234AB567CD'
    }

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .post('/auth/verify', examplePayload)
      .reply(200, mockAuthVerify)

    const result = await api.verify(examplePayload.verification)
    expect(result).toMatchObject(mockAuthVerify)
  })
})
