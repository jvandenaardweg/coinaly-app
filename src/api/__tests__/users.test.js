import * as api from '@/api/users'
import nock from 'nock'

import mockCreateUser from '@/mocks/create-user.json'

describe('api/users.js', () => {
  it('should reply with a success message on success', async () => {
    const examplePayload = {
      email: 'jordyvandenaardweg@gmail.com',
      password: 'testtest'
    }

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .post('/users', examplePayload)
      .reply(200, mockCreateUser)

    const result = await api.create(examplePayload.email, examplePayload.password)
    expect(result).toMatchObject(mockCreateUser)
  })
})
