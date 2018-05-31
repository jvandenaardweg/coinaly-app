<template>
  <div class="card card-100-xs">

    <loader v-if="isLoading"></loader>

    <card-partial-empty :text="emptyText"></card-partial-empty>

    <div v-if="!isLoading" class="list-group list-group-flush">
      <list-group-item-symbol-select
        v-for="(meta, symbol) in quoteMarkets"
        :key="symbol"
        :symbol="meta.quoteId"
        :meta="tickerLast(symbol, meta.quoteId)"
        :currency="symbols[meta.quoteId]"
        >
      </list-group-item-symbol-select>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '@/components/Loader'
import CardPartialEmpty from '@/components/card/PartialEmpty'
import ListGroupItemSymbolSelect from '@/components/list-group-item/SymbolSelect'

// Shows the quote markets based on baseId
// When baseId is "XRP", it will show "XRP/BTC" and "XRP/ETH" (example)
export default {
  name: 'CardQuoteMarkets',
  components: {
    Loader,
    CardPartialEmpty,
    ListGroupItemSymbolSelect
  },
  props: {
    baseId: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapGetters({
      getQuoteMarketsBySymbolId: 'markets/getQuoteMarketsBySymbolId',
      allTickers: 'tickers/allTickers',
      symbols: 'symbols/symbols',
      hasMarkets: 'markets/hasMarkets'
    }),
    isLoading () {
      return !this.symbols || !this.allTickers || !this.quoteMarkets
    },
    quoteMarkets () {
      return this.getQuoteMarketsBySymbolId(this.baseId)
    },
    emptyText () {
      if (!this.isLoading && !Object.keys(this.quoteMarkets).length) return `There are no markets available for ${this.baseId}.`
      return null
    }
  },
  methods: {
    tickerLast (marketSymbol, quoteId) {
      if (this.allTickers[marketSymbol]) {
        return `${this.allTickers[marketSymbol].last.toString()} ${quoteId}`
      } else {
        return 'Loading...'
      }
    }
  }
}
</script>
