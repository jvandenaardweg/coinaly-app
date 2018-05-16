<template>
  <div class="card card-100-xs">

    <loader v-if="isLoading"></loader>

    <card-partial-empty :text="emptyText"></card-partial-empty>

    <div v-if="!isLoading" class="list-group list-group-flush">
      <list-group-item-symbol-select
        v-for="(meta, symbol, index) in availableBalances"
        :key="symbol"
        :symbol="symbol"
        :meta="meta.free.toString()"
        :currency="currencies[symbol]"
        >
      </list-group-item-symbol-select>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pickBy from 'lodash/pickBy'
import Loader from '@/components/Loader'
import CardPartialEmpty from '@/components/card/PartialEmpty'
import ListGroupItemSymbolSelect from '@/components/list-group-item/SymbolSelect'

export default {
  name: 'CardQuoteMarket',
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
      allBaseMarkets: 'markets/allBaseMarkets',
      allFilledBalances: 'balances/allFilledBalances',
      getQuoteMarketsBySymbolId: 'markets/getQuoteMarketsBySymbolId',
      allTickers: 'tickers/allTickers',
      prices: 'prices/prices',
      currencies: 'symbols/symbols',
      isLoadingMarkets: 'markets/isLoading',
      isLoadingBalances: 'balances/isLoading',
      isLoadingCurrencies: 'symbols/isLoading',
      isLoadingPrices: 'prices/isLoading',
      isLoadingTickers: 'tickers/isLoading'
    }),
    isLoading () {
      return this.isLoadingBalances || this.isLoadingCurrencies || this.isLoadingTickers || this.isLoadingMarkets
    },
    availableBalances () {
      // Determine the available balances based on the quote symbol ID's
      const quoteMarkets = this.getQuoteMarketsBySymbolId(this.baseId)
      if (quoteMarkets && Object.keys(quoteMarkets).length) {
        return pickBy(this.allFilledBalances, (balance, symbolId) => {
          return Object.keys(quoteMarkets).some(marketSymbol => {
            return marketSymbol.includes(`/${symbolId}`)
          })
        })
      }
      return null
    },
    quoteMarkets () {
      const quoteMarkets = this.getQuoteMarketsBySymbolId(this.baseId)
      return pickBy(quoteMarkets, (quoteMarket, quoteMarketSymbol) => {
        return Object.keys(this.allFilledBalances).includes(quoteMarket.quoteId)
      })
    },
    emptyText () {
      if (!this.isLoading && !this.availableBalances) return `You have no balance available to buy ${this.baseId} with.`
      return null
    }
  }
}
</script>
