<template>
  <div class="card card-100-xs">

    <div class="card-header">
      <sub-nav :items="subNavItems"></sub-nav>
      <search class="mt-3" placeholder="Search for a currency..." @search="handleSearch"></search>
      <sorting @sort="handleSort"></sorting>
    </div>

    <loader v-if="isLoading"></loader>

    <card-partial-empty :text="emptyText"></card-partial-empty>

    <div v-if="!isLoading" class="list-group list-group-flush">
      <list-group-item-symbol-select
        v-for="(quoteSymbols, baseSymbol) in searchedMarkets"
        :key="baseSymbol"
        :symbol="baseSymbol"
        :badges="badges(baseSymbol)"
        :meta="meta(baseSymbol, quoteSymbols)"
        :currency="currency(baseSymbol)"
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
import Search from '@/components/Search'
import SubNav from '@/components/SubNav'
import pickBy from 'lodash/pickBy'
import Sorting from '@/components/Sorting'

export default {
  name: 'CardBaseMarkets',
  components: {
    CardPartialEmpty,
    ListGroupItemSymbolSelect,
    Search,
    SubNav,
    Loader,
    Sorting
  },
  data: () => ({
    searchQuery: null,
    sortBy: null
  }),
  computed: {
    ...mapGetters({
      allBaseMarkets: 'markets/allBaseMarkets',
      allFilledBalances: 'balances/allFilledBalances',
      allTickers: 'tickers/allTickers',
      prices: 'prices/prices',
      currencies: 'symbols/symbols',
      availableBaseMarkets: 'markets/availableBaseMarkets',
      unavailableBaseMarkets: 'markets/unavailableBaseMarkets',
      totalUnavailableBaseMarkets: 'markets/totalUnavailableBaseMarkets',
      totalAvailableBaseMarkets: 'markets/totalAvailableBaseMarkets',
      hasBalances: 'balances/hasBalances',
      isLoadingMarkets: 'markets/isLoading',
      isLoadingBalances: 'balances/isLoading',
      isLoadingCurrencies: 'symbols/isLoading',
      isLoadingPrices: 'prices/isLoading',
      isLoadingTickers: 'tickers/isLoading',
      marketsError: 'markets/error'
    }),
    subNavItems () {
      return [
        { label: 'Available', uri: '/buy', slug: 'available' },
        { label: 'Unavailable', uri: '/buy?filter=unavailable', slug: 'unavailable' }
      ]
    },
    isLoading () {
      return this.isLoadingBalances || this.isLoadingCurrencies || this.isLoadingTickers || this.isLoadingMarkets || this.isLoadingPrices
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
        return 'There are no markets available to buy in to. You should transfer some currencies to your exchange\'s wallets.'
      } else if (this.searchQuery && !this.hasSearchedMarkets) {
        return `No currencies found for <strong>${this.searchQuery}</strong>`
      } else if (this.marketsError) {
        return this.marketsError
      } else {
        return null
      }
    }
  },
  methods: {
    badges (symbolId) {
      if (this.filtering === 'unavailable') {
        return this.unavailableBaseMarkets[symbolId]
      } else {
        return this.availableBaseMarkets[symbolId]
      }
    },
    handleSort (sortBy) {
      this.sortBy = sortBy
    },
    handleSearch (query) {
      this.searchQuery = query
    },
    fallbackSymbol (symbol) {
      return {
        'icon_uri': '/static/icons/cryptocurrencies/svg/black/generic.svg',
        'name': symbol,
        'id': symbol
      }
    },
    currency (symbol) {
      return this.currencies[symbol] || this.fallbackSymbol(symbol)
    },
    balance (symbol) {
      return this.allFilledBalances[symbol] || { free: 0 }
    },
    ticker (baseSymbol, quoteSymbol) {
      return this.allTickers[`${baseSymbol}/${quoteSymbol}`]
    },
    tickerLast (baseSymbol, quoteSymbol) {
      if (this.ticker(baseSymbol, quoteSymbol)) return this.ticker(baseSymbol, quoteSymbol).last
      return 0
    },
    meta (baseSymbol, quoteSymbols) {
      let price = 0
      const firstQuoteSymbol = quoteSymbols[0] // We select the first. quoteSymbols is an array with market quote symbols, like: ['BTC', 'ETH', 'USDT']
      if (firstQuoteSymbol) {
        price = (this.tickerLast(baseSymbol, firstQuoteSymbol) * this.prices[firstQuoteSymbol].USD)
      }
      return this.$options.filters.currency(price)
    }
  }
}
</script>
