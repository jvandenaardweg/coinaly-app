const cryptocurrencies = require('cryptocurrencies')
const availableIcons = require('../../../../static/icons/cryptocurrencies/manifest.json')

export default {
  ...cryptocurrencies,
  availableIcons: availableIcons.icons
}
