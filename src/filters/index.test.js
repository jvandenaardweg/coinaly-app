import Vue from 'vue'
import './index'

describe('filters/index.js', () => {
  it('filter capitalize should correctly capitalize text', () => {
    const capitalized = Vue.filter('capitalize')('test')
    expect(capitalized).toBe('TEST')
  })

  it('filter currency should correctly return a currency', () => {
    const currency = Vue.filter('currency')('100.00')
    const currencyEuro = Vue.filter('currency')('100.00', '€')
    const currencyNull = Vue.filter('currency')('')
    expect(currency).toBe('$100.00')
    expect(currencyEuro).toBe('€100.00')
    expect(currencyNull).toBeNull()
  })

  it('filter percentage should correctly return a percentage number with suffix', () => {
    const percentage = Vue.filter('percentage')('100.00')
    const percentageZero = Vue.filter('percentage')(0)
    const percentageEmpty = Vue.filter('percentage')('')
    const percentageNull = Vue.filter('percentage')(null)
    expect(percentage).toBe('100.00%')
    expect(percentageZero).toBe('0.00%')
    expect(percentageEmpty).toBe('')
    expect(percentageNull).toBe(null)
  })

  it('filter readableDate should correctly return a human readable date', () => {
    const readableDate = Vue.filter('readableDate')('1988-07-19 12:00:00')
    expect(readableDate).toBe('19-07-1988 12:00:00')
  })

  it('filter toFixed should correctly return a decimal number', () => {
    const toFixed = Vue.filter('toFixed')(0.0123456789)
    const toFixedEmpty = Vue.filter('toFixed')(null)
    expect(toFixed).toBe('0.01234568')
    expect(toFixedEmpty).toBe(null)
  })

  it('filter number should correctly return a number', () => {
    const number = Vue.filter('number')(25000)
    const numberEmpty = Vue.filter('number')('')
    const numberNull = Vue.filter('number')(null)
    expect(number).toBe('25,000')
    expect(numberEmpty).toBe('')
    expect(numberNull).toBe(null)
  })

  it('filter shortNumber should correctly return a shortNumber', () => {
    const number = Vue.filter('shortNumber')(25000)
    const number = Vue.filter('shortNumber')(25)
    expect(number).toBe('25k')
    expect(number).toBe('25')
  })
})
