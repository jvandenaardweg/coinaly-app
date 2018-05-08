import * as api from '@/api/users'
import nock from 'nock'

import mockCreateUser from '@/mocks/create-user.json'
import mockUsersMe from '@/mocks/users-me.json'

describe('api/users.js', () => {
  it('should reply with a success message on success', async () => {
    const examplePayload = {
      email: 'jordyvandenaardweg@gmail.com',
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

    const result = await api.create(examplePayload.email, examplePayload.password, examplePayload.emailOptIn)
    expect(result).toMatchObject(mockCreateUser)
  })

  it('should reply with a user object from the logged in user', async () => {
    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get('/users/me')
      .reply(200, mockUsersMe)

    const result = await api.getMe()
    expect(result).toMatchObject(mockUsersMe)
  })
})
