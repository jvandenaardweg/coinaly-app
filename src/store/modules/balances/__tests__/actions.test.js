import nock from 'nock'
import actions from '@/store/modules/balances/actions'
// import state from '@/store/modules/balances/state'
import mockBalances from '@/mocks/balances.json'

const context = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: jest.fn(),
  rootGetters: {
    'exchanges/selected': 'bittrex'
  }
}

describe('modules/balances/actions.js', () => {

  // afterEach((done) => {
  //   nock.cleanAll()
  //   nock.restore()
  //   done()
  // })

  it('action getAll should set all currencies from the API', async (done) => {
    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get('/exchanges/bittrex/balances')
      .reply(200, mockBalances)

    const result = await actions.getAll(context, false)
    expect(result).toMatchObject(mockBalances)
    expect(context.commit).toHaveBeenCalledWith('startLoading')
    expect(context.commit).toHaveBeenCalledWith('addAll', mockBalances)
    expect(context.commit).toHaveBeenCalledWith('stopLoading')
    done()
  })

  // it('action getAll should set correct error when API returns error', async (done) => {
  //   nock('http://localhost:5000')
  //     .defaultReplyHeaders({
  //       'access-control-allow-origin': '*',
  //       'access-control-allow-credentials': 'true'
  //     })
  //     .get('/exchanges/bittrex/balances')
  //     .replyWithError({ message: 'This is a sample error' })

  //   await actions.getAll(context, false)
  //   expect(context.commit).toHaveBeenCalledWith('startLoading')
  //   expect(context.commit).toHaveBeenCalledWith('addServerError', 'Network Error')
  //   expect(context.commit).toHaveBeenCalledWith('stopLoading')
  //   done()
  // })

})
