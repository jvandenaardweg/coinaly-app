import { incrementNumber, decrementNumber, roundNumberFloor, roundNumberCeil, percentageDifference } from './numbers'

describe('helpers/numbers.js', () => {
  it('should return the correct incremented number', () => {
    expect(incrementNumber(0.00000001)).toBe('0.00000002')
    expect(incrementNumber(0.00000005)).toBe('0.00000006')
  })

  it('should return the correct decremented number', () => {
    expect(decrementNumber(0.00000005)).toBe('0.00000004')
    expect(decrementNumber(0.00000010)).toBe('0.00000009')
  })

  it('should return the correct floor rounded number', () => {
    expect(roundNumberFloor(2500.25)).toBe(2500)
    expect(roundNumberFloor(1999.99)).toBe(1999)
  })

  it('should return the correct ceil rounded number', () => {
    expect(roundNumberCeil(2500.25)).toBe(2501)
    expect(roundNumberCeil(1999.99)).toBe(2000)
  })

  it('should return the correct percentage difference between two numbers', () => {
    expect(percentageDifference(10, 20)).toBe('50.00')
    expect(percentageDifference(75, 100)).toBe('75.00')
    expect(percentageDifference(5.53, 10.65)).toBe('51.92')
  })
})
