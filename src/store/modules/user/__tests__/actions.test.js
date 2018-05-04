import nock from 'nock'
import actions from '@/store/modules/user/actions'
import mockCreateUser from '@/mocks/create-user.json'

const context = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: jest.fn()
}

describe('modules/user/actions.js', () => {
  it('action create should create a user in the database', async (done) => {
    const examplePayload = {
      email: 'info@coinaly.io',
      password: 'testtest',
      emailOptIn: false
    }

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .post('/users', examplePayload)
      .reply(200, mockCreateUser)

    await actions.create(context, examplePayload)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('setUser', mockCreateUser.user)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })
})
