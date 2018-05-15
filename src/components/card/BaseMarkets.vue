<template>
  <div class="card card-100-xs">

    <div class="card-header">
      <sub-nav :items="subNavItems"></sub-nav>
      <search placeholder="Search for a currency..." @search="handleSearch"></search>
    </div>

    <loader v-if="isLoading"></loader>

    <card-empty
      :is-empty="!isLoadingBalances && !hasSearchedMarkets"
      :text="emptyText"
      :actionLink="emptyActionLink"
      :actionLabel="emptyActionLabel">
    </card-empty>

    <list-group-base-markets
      v-if="!isLoading"
      :markets="searchedMarkets"
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

    emptyActionLink: null,
    emptyActionLabel: null,
    searchQuery: null
  }),
  computed: {
    ...mapGetters({
      allBaseMarkets: 'markets/allBaseMarkets',
      availableBaseMarkets: 'markets/availableBaseMarkets',
      unavailableBaseMarkets: 'markets/unavailableBaseMarkets',
      totalUnavailableBaseMarkets: 'markets/totalUnavailableBaseMarkets',
      totalAvailableBaseMarkets: 'markets/totalAvailableBaseMarkets',
      allFilledBalances: 'balances/allFilledBalances',
      allTickers: 'tickers/allTickers',
      prices: 'prices/prices',
      currencies: 'symbols/symbols',
      hasCurrencies: 'balances/hasCurrencies',
      isLoadingMarkets: 'markets/isLoading',
      isLoadingBalances: 'balances/isLoading',
      isLoadingCurrencies: 'symbols/isLoading',
      isLoadingPrices: 'prices/isLoading',
      isLoadingTickers: 'tickers/isLoading'
    }),
    subNavItems () {
      return [
        { label: 'Available', uri: '/buy', slug: 'available' },
        { label: 'Unavailable', uri: '/buy?filter=unavailable', slug: 'unavailable' }
      ]
    },
    isLoading () {
      return this.isLoadingBalances || this.isLoadingCurrencies || this.isLoadingTickers || this.isLoadingMarkets
    },
    filtering () {
      return this.$route.query.filter
    },
    markets () {
      if (this.filtering === 'unavailable') {
        return this.unavailableBaseMarkets
      } else {
        return this.availableBaseMarkets
      }
    },
    searchedMarkets () {
      if (this.searchQuery) {
        const searchQueryLower = this.searchQuery.toLowerCase()
        return pickBy(this.markets, (baseMarket, baseMarketSymbol) => {
          const baseMarketSymbolLower = baseMarketSymbol.toLowerCase()
          return baseMarketSymbolLower.includes(searchQueryLower)
        })
      } else {
        return this.markets
      }
    },
    hasSearchedMarkets () {
      if (this.searchedMarkets) return Object.keys(this.searchedMarkets).length > 0
      return false
    },
    emptyText () {
      // If there are avilable base markets, but non "unavailable" base markets
      if (this.totalAvailableBaseMarkets && !this.totalUnavailableBaseMarkets && this.filtering === 'unavailable') {
        return `No markets unavailable. You can already buy into ${this.totalAvailableBaseMarkets} available markets 😎`
      } else if (!this.totalAvailableBaseMarkets && this.filtering === 'available') {
        // this.emptyActionLink = '/wallets'
        // this.emptyActionLabel = 'View wallets'
        return 'There are no markets available to buy in to. You should transfer some currencies to your exchange\'s wallets.'
      } else if (this.searchQuery) {
        return `No currencies found for <strong>${this.searchQuery}</strong>`
      } else {
        return 'Nothing...'
      }
    }
  },
  methods: {
    handleSearch (query) {
      this.searchQuery = query
    }
  }
}
</script>
