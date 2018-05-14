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
import pickBy from 'lodash/pickBy'

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
    },
    availableBaseMarkets () {
      if (this.allBaseMarkets && this.allFilledBalances) {
        return pickBy(this.allBaseMarkets, (baseMarket, baseMarketSymbol) => {
          // A market is available when atleast one or more balance symbols is present in the base markets object
          return Object.keys(this.allFilledBalances).some(balanceSymbol => {
            return baseMarket.includes(balanceSymbol)
          })
        })
      }
    },
    unavailableBaseMarkets () {
      if (this.allBaseMarkets && this.allFilledBalances) {
        return pickBy(this.allBaseMarkets, (baseMarket, baseMarketSymbol) => {
          // A market is unavailable when EVERY balance symbol is not present in the base markets object
          return Object.keys(this.allFilledBalances).every(balanceSymbol => {
            return !baseMarket.includes(balanceSymbol)
          })
        })
      }
    }
  }
}
</script>
