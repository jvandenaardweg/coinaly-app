// import axios from './axios'
const initialProcessEnv = process.env.NODE_ENV

describe('axios.js', () => {
  beforeEach(() => {
    process.env.NODE_ENV = initialProcessEnv
    jest.resetModules()
  })

  it('returns a function', () => {
    const axios = require('./axios')
    expect(typeof axios).toBe('function')
  })

  it('sets the correct baseUrl', () => {
    const axios = require('./axios')
    expect(axios.defaults.baseURL).toBe('http://localhost:5000')
  })

  it('sets the correct production baseUrl', () => {
    process.env = {NODE_ENV: 'production'}
    const axios = require('./axios')
    expect(axios.defaults.baseURL).toBe('https://api.coinaly.io')
  })

  it('sets the correct default timeout', () => {
    const axios = require('./axios')
    expect(axios.defaults.timeout).toBe(10000)
  })
})
