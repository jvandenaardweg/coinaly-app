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
