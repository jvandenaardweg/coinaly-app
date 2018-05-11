import nock from 'nock'
import actions from '@/store/modules/user/actions'

import mockCreateUser from '@/mocks/create-user.json'
import mockUsersMe from '@/mocks/users-me.json'
import mockUsersMeDelete from '@/mocks/me-delete.json'

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

  it('action getMe should get the logged in user object', async (done) => {
    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get('/users/me')
      .reply(200, mockUsersMe)

    await actions.getMe(context)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('setUser', mockUsersMe)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })

  // it('action deleteMe should delete the user from the database', async (done) => {
  //   nock('http://localhost:5000')
  //     .defaultReplyHeaders({
  //       'access-control-allow-origin': '*',
  //       'access-control-allow-credentials': 'true'
  //     })
  //     .delete('/users/me')
  //     .reply(200, mockUsersMeDelete)

  //   await actions.getMe(context)
  //   expect(context.commit).toHaveBeenCalledWith('startLoading')
  //   expect(context.commit).toHaveBeenCalledWith('removeError')
  //   expect(context.commit).toHaveBeenCalledWith('removeSuccess')
  //   expect(context.commit).toHaveBeenCalledWith('setSuccess', mockUsersMeDelete.message)
  //   expect(context.commit).toHaveBeenCalledWith('stopLoading')
  //   done()
  // })
})
