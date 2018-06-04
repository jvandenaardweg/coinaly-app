<template>
  <div class="list-group list-group-flush">
    <router-link :to="marketLink(meta.base, meta.quote)" v-if="!isLoading && isWithinPageLimit(index)" v-for="(meta, symbol, index) in filteredMarkets" :key="symbol" :index="index" class="list-group-item list-group-item-action">
      <list-group-item-market
        :currency="currencies[meta.base]"
        :market="meta" :ticker="allTickers[symbol]"
        :price="prices[meta.quote]"
        :favorite="isFavoriteMarket(symbol)"
        :hideVolume="false">
      </list-group-item-market>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListGroupItemMarket from '@/components/list-group-item/Market'
import pickBy from 'lodash/pickBy'

export default {
  name: 'ListGroupMarkets',
  props: {
    quote: String
  },
  components: {
    ListGroupItemMarket
  },
  data () {
    return {
      marketIndex: null,
      paginationLimit: 20
    }
  },
  computed: {
    ...mapGetters({
      isLoadingMarkets: 'markets/isLoading',
      isLoadingCurrencies: 'symbols/isLoading',
      isLoadingTickers: 'tickers/isLoading',
      isLoadingPrices: 'prices/isLoading',
      allMarkets: 'markets/allMarkets',
      allTickers: 'tickers/allTickers',
      selectedExchange: 'exchanges/selected',
      userMarketFavorites: 'user/marketFavorites',
      currencies: 'symbols/symbols',
      prices: 'prices/prices',
      hasMarkets: 'markets/hasMarkets'
    }),
    isLoading () {
      return this.isLoadingMarkets || this.isLoadingCurrencies || this.isLoadingTickers || this.isLoadingPrices
    },
    filteredMarkets () {
      if (this.quote === 'all') {
        return this.allMarkets
      } else {
        return pickBy(this.allMarkets, (values, marketSymbol) => {
          return values.quote === this.quote
        })
      }
    }
  },
  methods: {
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
      this.paginationLimit = 9999
    },
    marketLink (base, quote) {
      if (base && quote) return `/markets/${quote}/${base}`
      return `/markets/${quote}`
    }
  }
}
</script>
