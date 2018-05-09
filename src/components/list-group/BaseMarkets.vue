<template>
  <div class="list-group list-group-flush">
    <!-- <router-link
      :to="`buy/${symbol}`"
      v-for="(meta, symbol, index) in markets"
      :key="symbol"
      :index="index"
      class="list-group-item list-group-item-action"> -->

      <list-group-item-symbol-select
        v-for="(quoteSymbol, baseSymbol, index) in markets"
        :key="baseSymbol"
        :symbol="baseSymbol"
        :meta="meta(baseSymbol, quoteSymbol)"
        :currency="currencies[baseSymbol]"
        >
      </list-group-item-symbol-select>

      <!-- <list-group-item-market-simple
        :currency="currencies[symbol]"
        :symbol="symbol"
        :balance="balance(symbol)">
      </list-group-item-market-simple> -->

    <!-- </router-link> -->

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
    meta (baseSymbol, quoteSymbol) {
      const price = (this.tickerLast(baseSymbol, quoteSymbol) * this.prices[quoteSymbol].USD)

      return this.$options.filters.currency(price)
    }
  }
}
</script>

<style lang="scss">
//
</style>
