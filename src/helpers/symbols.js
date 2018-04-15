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
  let symbolUppercased = symbol.toUpperCase()
  // Some exchanges use Change iota to miota (some exchanges use iota, which the wrong symbol name)
  if (symbolUppercased === 'IOTA' || symbolUppercased === 'MIOTA') symbolUppercased = 'IOT'
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
  let lowerCasedSymbol = symbol.toLowerCase()
  // Change iota to miota (some exchanges use iota, which the wrong symbol name)
  if (lowerCasedSymbol === 'iota' || lowerCasedSymbol === 'miota') lowerCasedSymbol = 'miota'
  return `static/icons/cryptocurrencies/svg/color/${lowerCasedSymbol}.svg`
}
