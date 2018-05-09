<template>
  <div class="card card-100-xs">

    <!-- <div class="card-header">
      <h2 class="h5 m-0">Your balances on {{ selectedExchangeName }}</h2>
    </div> -->

    <card-loading :is-loading="isLoading" :text="'Loading Balances...'"></card-loading>

    <card-empty :is-empty="!isLoadingBalances && !hasCurrencies" :text="'You have nothing in your balance, yet.'"></card-empty>

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
import CardLoading from '@/components/card/CardPartialLoading'
import CardEmpty from '@/components/card/CardPartialEmpty'
import ListGroupBalances from '@/components/list-group/Balances'

export default {
  name: 'CardBalances',
  components: {
    CardLoading,
    CardEmpty,
    ListGroupBalances
  },
  computed: {
    ...mapGetters({
      allFilledBalances: 'balances/allFilledBalances',
      currencies: 'currencies/currency',
      allTickers: 'tickers/allTickers',
      selectedExchangeName: 'exchanges/selectedName',
      isLoadingBalances: 'balances/isLoading',
      isLoadingTickers: 'tickers/isLoading',
      hasCurrencies: 'balances/hasCurrencies',
      isLoadingCurrencies: 'currencies/isLoading',
      prices: 'prices/prices',
      isLoadingPrices: 'prices/isLoading'
    }),
    isLoading () {
      return this.isLoadingBalances || this.isLoadingCurrencies || this.isLoadingTickers || this.isLoadingPrices
    }
  }
}
</script>

<style lang="scss">
//
</style>
