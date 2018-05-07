import * as api from '@/api/auth'
import nock from 'nock'

import mockAuthLogin from '@/mocks/auth-login.json'
import mockAuthVerify from '@/mocks/auth-verify.json'
import mockAuthResetPassword from '@/mocks/auth-reset-password.json'
import mockAuthResetToken from '@/mocks/auth-reset-token.json'

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
      verificationToken: '1234AB567CD'
    }

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .post('/auth/verify', examplePayload)
      .reply(200, mockAuthVerify)

    const result = await api.verify(examplePayload.verificationToken)
    expect(result).toMatchObject(mockAuthVerify)
  })

  it('requestResetToken should return a 200 when succeed', async () => {
    const examplePayload = {
      email: 'test@coinaly.io'
    }

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .post('/auth/reset', examplePayload)
      .reply(200, mockAuthResetToken)

    const result = await api.requestResetToken(examplePayload.email)
    expect(result).toMatchObject(mockAuthResetToken)
  })

  it('resetPassword should return a 200 when succeed', async () => {
    const examplePayload = {
      password: 'testtest',
      resetToken: '1234AB567CD'
    }

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .post('/auth/reset/password', examplePayload)
      .reply(200, mockAuthResetPassword)

    const result = await api.resetPassword(examplePayload.password, examplePayload.resetToken)
    expect(result).toMatchObject(mockAuthResetPassword)
  })
})
