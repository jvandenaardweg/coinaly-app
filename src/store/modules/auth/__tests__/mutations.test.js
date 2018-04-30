import mutations from '@/store/modules/auth/mutations'
import state from '@/store/modules/auth/state'

// import balancesMock from '@/mocks/balances.json'

describe('modules/auth/mutations.js', () => {
  it('mutation startLoading sets state.isLoading to true', () => {
    mutations.startLoading(state)
    expect(state.isLoading).toBe(true)
  })

  it('mutation stopLoading sets state.isLoading to false', () => {
    mutations.stopLoading(state)
    expect(state.isLoading).toBe(false)
  })

  it('mutation setAuthenticated sets state.isAuthenticated to true', () => {
    mutations.setAuthenticated(state)
    expect(state.isAuthenticated).toBe(true)
  })

  it('mutation unsetAuthenticated sets state.isAuthenticated to false', () => {
    mutations.unsetAuthenticated(state)
    expect(state.isAuthenticated).toBe(false)
  })

  it('mutation setToken sets state.token', () => {
    mutations.setToken(state, 'testtoken')
    expect(state.token).toBe('testtoken')
  })

  it('mutation setError sets state.error', () => {
    mutations.setError(state, 'Some error happened.')
    expect(state.error).toBe('Some error happened.')
  })
})
