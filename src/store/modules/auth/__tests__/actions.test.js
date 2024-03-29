import nock from 'nock'
import actions from '@/store/modules/auth/actions'

import mockAuthLogin from '@/mocks/auth-login.json'
import mockAuthVerify from '@/mocks/auth-verify.json'
import mockAuthResetPassword from '@/mocks/auth-reset-password.json'
import mockAuthResetToken from '@/mocks/auth-reset-token.json'

const context = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: jest.fn()
}

describe('modules/auth/actions.js', () => {
  it('action login should set the user logged in on success', async (done) => {
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

    const result = await actions.login(context, examplePayload)
    expect(result).toMatchObject(mockAuthLogin)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('setAuthenticated')
    expect(context.commit).toHaveBeenCalledWith('setToken', mockAuthLogin.token)
    expect(context.commit).toHaveBeenCalledWith('user/setUser', mockAuthLogin.user, { root: true })
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })

  it('action login should set an error message when login credentials are invalid', async (done) => {
    const examplePayload = {
      email: 'jordyvandenaardweg@gmail.com',
      password: 'invalid'
    }

    const mockResponse = {
      error: 'Bad Request',
      message: 'Password is incorrect.',
      statusCode: 400
    }

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .post('/auth/login', examplePayload)
      .reply(400, mockResponse)

    const result = await actions.login(context, examplePayload)
    expect(result.response.data).toMatchObject(mockResponse)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('setError', mockResponse.message)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })

  it('action login should set an error message when e-mail address is not found', async (done) => {
    const examplePayload = {
      email: 'notfound@coinaly.io',
      password: 'testtest'
    }

    const mockResponse = {
      error: 'Not Found',
      message: 'E-mail address is not found.',
      statusCode: 404
    }

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .post('/auth/login', examplePayload)
      .reply(404, mockResponse)

    const result = await actions.login(context, examplePayload)
    expect(result.response.data).toMatchObject(mockResponse)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('setError', mockResponse.message)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })

  it('action login should set an error message when account need activation', async (done) => {
    const examplePayload = {
      email: 'notfound@coinaly.io',
      password: 'testtest'
    }

    const mockResponse = {
      error: 'Bad Request',
      message: 'Your account is not acivated yet. Please check your e-mail.',
      statusCode: 400
    }

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .post('/auth/login', examplePayload)
      .reply(400, mockResponse)

    const result = await actions.login(context, examplePayload)
    expect(result.response.data).toMatchObject(mockResponse)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('removeError')
    expect(context.commit).toHaveBeenCalledWith('setError', mockResponse.message)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })

  it('action logout should log the user out of the app', async (done) => {
    window.location.reload = jest.fn()
    await actions.logout(context)
    expect(context.commit).toHaveBeenCalledWith('removeToken')
    expect(context.commit).toHaveBeenCalledWith('unsetAuthenticated')
    done()
  })

  it('action setOnLoad should set the logged in user', async (done) => {
    const exampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgyNzUzM2Q4LTRhNmQtNDQ4OC05NzRhLTRmYmQzNjFiOWMxNSIsImVtYWlsIjoiam9yZHl2YW5kZW5hYXJkd2VnQGdtYWlsLmNvbSIsImlhdCI6MTUyNTE2NjU1MH0.L-ttaXXws8FA_b2jPUWpLBddeuLjcNJaYzJraOQl_8g'
    await actions.setOnLoad(context, exampleToken)
    expect(context.commit).toHaveBeenCalledWith('setAuthenticated')
    expect(context.commit).toHaveBeenCalledWith('setToken', exampleToken)
    expect(context.commit).toHaveBeenCalledWith('user/setUser', mockAuthLogin.user, { root: true })
    done()
  })

  it('action verify should verify the users email address', async (done) => {
    const examplePayload = {
      verificationToken: '1234AB5678CD'
    }

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .post('/auth/verify', examplePayload)
      .reply(200, mockAuthVerify)

    const result = await actions.verify(context, examplePayload.verificationToken)
    expect(result).toMatchObject(mockAuthVerify)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('setVerified')
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })

  it('action requestResetToken send an email to the user with a reset token URL', async (done) => {
    const examplePayload = {
      email: 'info@coinaly.io'
    }

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .post('/auth/reset', examplePayload)
      .reply(200, mockAuthResetToken)

    const result = await actions.requestResetToken(context, examplePayload.email)
    expect(result).toMatchObject(mockAuthResetToken)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('setSuccess', mockAuthResetToken.message)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })

  it('action resetPassword should reset the password for the user with that resetToken', async (done) => {
    const examplePayload = {
      password: 'testtest',
      resetToken: '1234AB5678CD'
    }

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .post('/auth/reset/password', examplePayload)
      .reply(200, mockAuthResetPassword)

    const result = await actions.resetPassword(context, examplePayload)
    expect(result).toMatchObject(mockAuthResetPassword)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('setSuccess', mockAuthResetPassword.message)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })
})
