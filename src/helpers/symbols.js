const cryptocurrencies = require('cryptocurrencies')

// Returns "BTC" from "XVG/BTC"
export function marketSymbolToBaseSymbol (marketSymbol) {
  const marketSymbolUppercased = marketSymbol.toUpperCase()
  return marketSymbolUppercased.split('/')[1]
}

// Returns "XVG" from "XVG/BTC"
export function marketSymbolToQuoteSymbol (marketSymbol) {
  const marketSymbolUppercased = marketSymbol.toUpperCase()
  return marketSymbolUppercased.split('/')[0]
}

// Returns "Verge" from "XVG"
export function symbolToName (symbol) {
  const symbolUppercased = symbol.toUpperCase()
  const currencyFullName = cryptocurrencies[symbolUppercased]
  if (currencyFullName) return currencyFullName
  return null
}

// Returns ["Verge", "Bitcoin"] from "XVG/BTC"
export function symbolsToNames (symbols) {
  if (!symbols) return null
  const symbolsArray = symbols.split('/')
  return symbolsArray.map(symbol => {
    if (cryptocurrencies[symbol]) return cryptocurrencies[symbol]
    return null
  })
}

export function symbolIconLocation (symbol) {
  const lowerCasedSymbol = symbol.toLowerCase()
  return `static/icons/cryptocurrencies/svg/color/${lowerCasedSymbol}.svg`
}
