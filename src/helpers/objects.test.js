import { filterObjectKeys } from './objects'

describe('helpers/objects.js', () => {
  it('should return the correct filtered objects', () => {
    const list = {
      'XVG/BTC': { last: 0 },
      'XVG/ETH': { last: 0 },
      'BTC/USDT': { last: 0 }
    }
    const expected = {
      'XVG/BTC': { last: 0 },
      'XVG/ETH': { last: 0 }
    }
    expect(filterObjectKeys(list, 'XVG/')).toMatchObject(expected)
  })
})
