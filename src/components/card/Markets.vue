<template>
  <div class="card card-100-xs">

    <div class="card-header">
      <h2 class="h5 m-0">Available markets ({{ totalMarkets }})</h2>
      <sub-nav v-if="hasMarkets" class="mt-3" :items="subNavItems" :selected="selected"></sub-nav>
      <search class="mt-3" @search="handleSearch" placeholder="Search for a market..."></search>
      <sorting @sort="handleSort"></sorting>
    </div>

    <loader v-if="isLoading"></loader>

    <card-partial-empty :text="emptyText"></card-partial-empty>

    <div class="list-group list-group-flush">
      <router-link
        v-if="!isLoading && isWithinPageLimit(index)"
        v-for="(meta, symbol, index) in searchedMarkets"
        :to="marketLink(meta.base, meta.quote)"
        :key="symbol"
        :index="index"
        class="list-group-item list-group-item-action">
        <list-group-item-market
          :currency="currencies[meta.base]"
          :market="meta" :ticker="allTickers[symbol]"
          :price="prices[meta.quote]"
          :favorite="isFavoriteMarket(symbol)"
          :hideVolume="false">
        </list-group-item-market>
      </router-link>
    </div>

    <div class="card-footer" v-if="showMoreButton">
      <button type="button" class="btn btn-primary btn-block" @click.prevent="handleShowAllMarkets">Show {{ paginationIncrement }} more markets</button>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '@/components/Loader'
import CardPartialEmpty from '@/components/card/PartialEmpty'
import SubNav from '@/components/SubNav'
import Search from '@/components/Search'
import Sorting from '@/components/Sorting'
import pickBy from 'lodash/pickBy'
import ListGroupItemMarket from '@/components/list-group-item/Market'

export default {
  name: 'CardMarkets',
  components: {
    CardPartialEmpty,
    SubNav,
    Search,
    Loader,
    Sorting,
    ListGroupItemMarket
  },
  data: () => ({
    searchQuery: null,
    sortBy: null,
    paginationLimit: 20,
    paginationIncrement: 50,
    selected: null
  }),
  computed: {
    ...mapGetters({
      isLoadingMarkets: 'markets/isLoading',
      isLoadingTickers: 'tickers/isLoading',
      isLoadingCurrencies: 'symbols/isLoading',
      hasMarkets: 'markets/hasMarkets',
      allQuoteMarkets: 'markets/allQuoteMarkets',
      allFavoriteMarkets: 'markets/allFavoriteMarkets',
      allMarkets: 'markets/allMarkets',
      totalMarkets: 'markets/totalMarkets',
      isLoadingPrices: 'prices/isLoading',
      allTickers: 'tickers/allTickers',
      selectedExchange: 'exchanges/selected',
      userMarketFavorites: 'user/marketFavorites',
      currencies: 'symbols/symbols',
      prices: 'prices/prices',
      marketsError: 'markets/error'
    }),
    isLoading () {
      return this.isLoadingMarkets || this.isLoadingCurrencies || this.isLoadingTickers || this.isLoadingPrices
    },
    emptyText () {
      if (this.filtering === 'favorites' && !this.isLoadingMarkets && !this.hasSearchedMarkets && !this.searchQuery) {
        return `You have no favorite markets, yet!`
      } else if (!this.isLoadingMarkets && !this.hasSearchedMarkets && !this.searchQuery) {
        return `No markets available...`
      }  else if (this.searchQuery && !this.hasSearchedMarkets) {
        return `No markets found for <strong>${this.searchQuery}</strong>`
      } else if (this.marketsError) {
        return this.marketsError
      } else {
        return null
      }
    },
    hasSearchedMarkets () {
      return Object.keys(this.searchedMarkets).length > 0
    },
    totalSearchedMarkets () {
      return Object.keys(this.searchedMarkets).length
    },
    filtering () {
      return this.$route.query.filter
    },
    markets () {
      if (this.filtering === 'favorites') {
        return this.allFavoriteMarkets
      } else if (this.filtering) {
        const quoteId = this.filtering
        return pickBy(this.allMarkets, (values, marketSymbol) => {
          return values.quote === quoteId
        })
      } else {
        return this.allMarkets
      }
    },
    searchedMarkets () {
      if (this.searchQuery) {
        const searchQueryLower = this.searchQuery.toLowerCase()
        return pickBy(this.markets, (baseMarket, marketSymbol) => {
          const marketSymbolLower = marketSymbol.toLowerCase()
          return marketSymbolLower.includes(searchQueryLower)
        })
      } else {
        return this.markets
      }
    },
    subNavItems () {
      let items = [
        { label: '', slug: '', uri: '/markets?filter=favorites', icon: 'star' },
        { label: 'All', slug: 'all', uri: '/markets' }
      ]

      Object.keys(this.allQuoteMarkets).forEach(key => {
        items.push(
          {
            label: key,
            slug: key.toLowerCase(),
            uri: `/markets?filter=${key}`
          }
        )
      })

      return items
    },
    showMoreButton () {
      return this.hasSearchedMarkets && (this.paginationLimit <= this.totalSearchedMarkets)
    }
  },
  methods: {
    handleSearch (searchQuery) {
      this.searchQuery = searchQuery
    },
    handleSort (sortBy) {
      this.sortBy = sortBy
    },
    isFavoriteMarket (symbol) {
      return Boolean(this.userMarketFavorites[this.selectedExchange][symbol])
    },
    isWithinPageLimit (index) {
      this.marketsIndex = index
      if (index < this.paginationLimit) {
        return true
      } else {
        return false
      }
    },
    handleShowAllMarkets () {
      const totalMarkets = Object.keys(this.searchedMarkets).length
      this.paginationLimit = this.paginationLimit + this.paginationIncrement
    },
    marketLink (base, quote) {
      if (base && quote) return `/markets/${base}/${quote}`
      return `/markets/${base}`
    }
  }
}
</script>
