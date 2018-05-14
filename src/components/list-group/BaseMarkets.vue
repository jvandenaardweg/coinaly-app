<template>
  <div class="list-group list-group-flush">
    <list-group-item-symbol-select
      v-for="(quoteSymbols, baseSymbol, index) in markets"
      :key="baseSymbol"
      :symbol="baseSymbol"
      :meta="meta(baseSymbol, quoteSymbols)"
      :currency="currency(baseSymbol)"
      :isBuyable="isBuyable(quoteSymbols)"
      >
    </list-group-item-symbol-select>
  </div>
</template>

<script>
import ListGroupItemSymbolSelect from '@/components/list-group-item/SymbolSelect'

export default {
  name: 'ListGroupMarkets',
  components: {
    ListGroupItemSymbolSelect
  },
  props: {
    markets: {
      type: Object,
      required: true
    },
    currencies: {
      type: Object,
      required: true
    },
    balances: {
      type: Object,
      required: true
    },
    prices: {
      type: Object,
      required: true
    },
    tickers: {
      type: Object,
      required: true
    }
  },
  methods: {
    fallbackSymbol (symbol) {
      return {
        'icon_uri': '/static/icons/cryptocurrencies/svg/black/generic.svg',
        'name': symbol,
        'id': symbol
      }
    },
    currency (symbol) {
      return this.currencies[symbol] || this.fallbackSymbol(symbol)
    },
    balance (symbol) {
      return this.balances[symbol] || { free: 0 }
    },
    ticker (baseSymbol, quoteSymbol) {
      return this.tickers[`${baseSymbol}/${quoteSymbol}`]
    },
    tickerLast (baseSymbol, quoteSymbol) {
      if (this.ticker(baseSymbol, quoteSymbol)) return this.ticker(baseSymbol, quoteSymbol).last
      return 0
    },
    meta (baseSymbol, quoteSymbols) {
      const firstQuoteSymbol = quoteSymbols[0] // We select the first. quoteSymbols is an array with market quote symbols, like: ['BTC', 'ETH', 'USDT']
      const price = (this.tickerLast(baseSymbol, firstQuoteSymbol) * this.prices[firstQuoteSymbol].USD)

      return this.$options.filters.currency(price)
    },
    isBuyable (quoteSymbols) {
      // TODO: Also check if balances.free meets the treshhold of a minimum order
      if (quoteSymbols) {
        return quoteSymbols.filter(symbol => {
          return Object.keys(this.balances).includes(symbol)
        }).length > 0
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
//
</style>
