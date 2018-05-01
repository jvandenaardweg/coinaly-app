import nock from 'nock'
import actions from '@/store/modules/auth/actions'
import mockAuthLogin from '@/mocks/auth-login.json'

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
    await actions.logout(context)
    expect(context.commit).toHaveBeenCalledWith('removeToken')
    expect(context.commit).toHaveBeenCalledWith('unsetAuthenticated')
    done()
  })

  it('action setOnLoadAuth should set the logged in user', async (done) => {
    const exampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgyNzUzM2Q4LTRhNmQtNDQ4OC05NzRhLTRmYmQzNjFiOWMxNSIsImVtYWlsIjoiam9yZHl2YW5kZW5hYXJkd2VnQGdtYWlsLmNvbSIsImlhdCI6MTUyNTE2NjU1MH0.L-ttaXXws8FA_b2jPUWpLBddeuLjcNJaYzJraOQl_8g'
    await actions.setOnLoadAuth(context, exampleToken)
    expect(context.commit).toHaveBeenCalledWith('setAuthenticated')
    expect(context.commit).toHaveBeenCalledWith('setToken', exampleToken)
    expect(context.commit).toHaveBeenCalledWith('user/setUser', mockAuthLogin.user, { root: true })
    done()
  })
})
