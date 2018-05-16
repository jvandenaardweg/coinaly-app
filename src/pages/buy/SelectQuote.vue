<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-10 col-md-10 col-lg-6 col-xl-6">
        <div class="text-center">
          <h1 class="h2 mb-4">Select a balance</h1>
          <p class="text-muted">Which currency you want to use to buy {{ baseId }}?</p>
        </div>

        <div class="card card-100-xs">

          <!-- <div class="card-header">
            <sub-nav :items="subNavItems"></sub-nav>
            <search placeholder="Search for a currency..." @search="handleSearch"></search>
          </div> -->

          <loader v-if="isLoading"></loader>

          <card-empty
            :is-empty="!isLoading && !availableBalances"
            :text="emptyText">
          </card-empty>

          <div v-if="!isLoading" class="list-group list-group-flush">
            <list-group-item-symbol-select
              v-for="(meta, symbol, index) in availableBalances" :key="symbol"
              :symbol="symbol"
              :meta="meta.free.toString()"
              :currency="currencies[symbol]"
              >
            </list-group-item-symbol-select>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '@/components/Loader'
import CardLoading from '@/components/card/CardPartialLoading'
import CardEmpty from '@/components/card/CardPartialEmpty'
import ListGroupBaseMarkets from '@/components/list-group/BaseMarkets'
import pickBy from 'lodash/pickBy'
import ListGroupItemSymbolSelect from '@/components/list-group-item/SymbolSelect'

export default {
  name: 'PageBuySelectQuote',
  components: {
    ListGroupBaseMarkets,
    Loader,
    CardLoading,
    CardEmpty,
    ListGroupItemSymbolSelect
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
    baseId () {
      return this.$route.params.baseId
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
      return `You have no balance available to buy ${this.baseId} with.`
    }
  }
}
</script>
