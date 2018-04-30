import nock from 'nock'
import actions from '@/store/modules/auth/actions'
import mockAuthLogin from '@/mocks/auth-login.json'

const context = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: jest.fn()
}

describe('modules/auth/actions.js', () => {

  it('action getAll should set all balances from the API', async (done) => {
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
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })
})
