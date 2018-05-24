<template>
  <div class="card card-100-xs card-flat-top">

    <loader v-if="isLoading"></loader>

    <card-partial-empty :text="emptyText"></card-partial-empty>

    <list-group-balances
      v-if="!isLoading"
      :balances="allFilledBalances"
      :currencies="currencies"
      :prices="prices"
      :tickers="allTickers">
    </list-group-balances>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '@/components/Loader'
import CardPartialEmpty from '@/components/card/PartialEmpty'
import ListGroupBalances from '@/components/list-group/Balances'

export default {
  name: 'CardBalances',
  components: {
    CardPartialEmpty,
    ListGroupBalances,
    Loader
  },
  computed: {
    ...mapGetters({
      allFilledBalances: 'balances/allFilledBalances',
      balancesError: 'balances/error',
      currencies: 'symbols/symbols',
      allTickers: 'tickers/allTickers',
      selectedExchangeName: 'exchanges/selectedName',
      isLoadingBalances: 'balances/isLoading',
      isLoadingTickers: 'tickers/isLoading',
      hasCurrencies: 'balances/hasCurrencies',
      isLoadingCurrencies: 'symbols/isLoading',
      prices: 'prices/prices',
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
  }
}
</script>

<style lang="scss">
//
</style>
