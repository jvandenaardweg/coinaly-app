<template>
  <div class="card card-100-xs">

    <div class="card-header">
      <sub-nav :items="subNavItems"></sub-nav>
      <search placeholder="Search for a market..."></search>
    </div>

    <loader v-if="isLoading"></loader>
    <!-- <card-loading :is-loading="isLoading" :text="'Loading Markets...'"></card-loading> -->

    <card-empty :is-empty="!isLoadingBalances && !hasCurrencies" :text="'You have nothing in your balance, yet.'"></card-empty>

    <list-group-base-markets
      v-if="!isLoading"
      :markets="allBaseMarkets"
      :currencies="currencies"
      :prices="prices"
      :tickers="allTickers"
      :balances="allFilledBalances">
    </list-group-base-markets>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '@/components/Loader'
import CardLoading from '@/components/card/CardPartialLoading'
import CardEmpty from '@/components/card/CardPartialEmpty'
import ListGroupBaseMarkets from '@/components/list-group/BaseMarkets'
import Search from '@/components/Search'
import SubNav from '@/components/SubNav'

export default {
  name: 'CardBaseMarkets',
  components: {
    CardLoading,
    CardEmpty,
    ListGroupBaseMarkets,
    Search,
    SubNav,
    Loader
  },
  data: () => ({
    subNavItems: [
      { label: 'All', uri: '', slug: 'all' },
      { label: 'Available', uri: 'available', slug: 'available' },
      { label: 'Unavailable', uri: 'unavailable', slug: 'unavailable' }
    ]
  }),
  computed: {
    ...mapGetters({
      allBaseMarkets: 'markets/allBaseMarkets',
      allFilledBalances: 'balances/allFilledBalances',
      allTickers: 'tickers/allTickers',
      prices: 'prices/prices',
      currencies: 'symbols/symbols',
      isLoadingBalances: 'balances/isLoading',
      hasCurrencies: 'balances/hasCurrencies',
      isLoadingCurrencies: 'symbols/isLoading',
      isLoadingPrices: 'prices/isLoading',
      isLoadingTickers: 'tickers/isLoading'
    }),
    isLoading () {
      return this.isLoadingBalances || this.isLoadingCurrencies || this.isLoadingTickers
    }
  }
}
</script>

<style lang="scss">
// .list-group-item,
// label {
//   cursor: pointer;
// }

// .card-footer {
//   @include media-breakpoint-only(xs) {
//     padding-left: 0.75rem;
//     padding-right: 0.75rem;
//     position: fixed;
//     background: none;
//     left: 0;
//     width: 100%;
//     bottom: 0;
//     border: 0;
//   }
// }
</style>
