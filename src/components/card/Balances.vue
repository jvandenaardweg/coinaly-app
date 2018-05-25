<template>
  <div class="card card-100-xs card-flat-top">

    <loader v-if="isLoading"></loader>

    <card-partial-empty :text="emptyText"></card-partial-empty>

    <div class="list-group list-group-flush" v-if="!isLoading">
      <router-link
        class="list-group-item list-group-item-action"
        v-for="(balance, symbolId, index) in allFilledBalances"
        :to="`balances/${symbolId}`"
        :key="symbolId"
        :index="index">

        <list-group-item-balance
          :symbol="symbol(symbolId)"
          :symbolId="symbolId"
          :balance="balance"
          :price="price(symbolId)"
          :percentage="percentage(symbolId)"
          :tickerLast="tickerLast(symbolId)">
        </list-group-item-balance>
      </router-link>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '@/components/Loader'
import CardPartialEmpty from '@/components/card/PartialEmpty'
import ListGroupItemBalance from '@/components/list-group-item/Balance'

export default {
  name: 'CardBalances',
  components: {
    CardPartialEmpty,
    ListGroupItemBalance,
    Loader
  },
  computed: {
    ...mapGetters({
      allFilledBalances: 'balances/allFilledBalances',
      hasCurrencies: 'balances/hasCurrencies',
      balancesError: 'balances/error',
      symbols: 'symbols/symbols',
      allTickers: 'tickers/allTickers',
      selectedExchangeName: 'exchanges/selectedName',
      availableBaseMarkets: 'markets/availableBaseMarkets',
      prices: 'prices/prices',
      isLoadingTickers: 'tickers/isLoading',
      isLoadingCurrencies: 'symbols/isLoading',
      isLoadingBalances: 'balances/isLoading',
      isLoadingPrices: 'prices/isLoading',
      isLoadingMarkets: 'markets/isLoading'
    }),
    isLoading () {
      return this.isLoadingBalances || this.isLoadingCurrencies || this.isLoadingTickers || this.isLoadingPrices || this.isLoadingMarkets
    },
    emptyText () {
      if (this.balancesError) return this.balancesError
      if (!this.isLoading && !this.hasCurrencies) return 'You have nothing in your balance, yet.'
      return null
    }
  },
  methods: {
    tickerQuote (symbolId) {
      // TODO: USDT will not return a base market, needs to be fixed
      const baseMarket = this.availableBaseMarkets[symbolId]
      if (baseMarket) return baseMarket[0]
      return null
    },
    price (symbolId) {
      return this.prices[this.tickerQuote(symbolId)]
    },
    symbol (symbolId) {
      return this.symbols[symbolId]
    },
    balanceTicker (symbolId) {
      return this.allTickers[`${symbolId}/${this.tickerQuote(symbolId)}`]
    },
    tickerLast (symbolId) {
      if (this.balanceTicker(symbolId)) return this.balanceTicker(symbolId).last
      return 0
    },
    percentage (symbolId) {
      if (this.balanceTicker(symbolId) && this.balanceTicker(symbolId).percentage) {
        return this.balanceTicker(symbolId).percentage
      } else if (this.balanceTicker(symbolId)) {
        return this.relativePercentage(symbolId)
      } else {
        return 0
      }
    },
    relativePercentage (symbolId) {
      return (this.balanceTicker(symbolId).last - this.balanceTicker(symbolId).open) * 100
    }
  }
}
</script>

<style lang="scss">
//
</style>
