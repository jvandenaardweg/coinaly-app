import Vue from 'vue'
import numeral from 'numeral'
// const moment = require('moment')
import format from 'date-fns/format'

Vue.filter('capitalize', function (value) {
  return value.toUpperCase()
})

Vue.filter('currency', function (value, prefix = '$') {
  if (!value) return null
  return prefix + numeral(value).format(`0,0.00`)
})

Vue.filter('percentage', function (value) {
  if (value === null || value === '') return value
  return parseFloat(value).toFixed(2) + '%'
})

Vue.filter('readableDate', function (value) {
  return format(value, 'DD-MM-YYYY HH:mm:ss')
})

Vue.filter('toFixed', function (value, decimals = 8) {
  if (value === null) return value
  return value.toFixed(decimals)
})

Vue.filter('number', function (value) {
  if (!value) return value
  return numeral(value).format('0,0.[00000000]')
})
