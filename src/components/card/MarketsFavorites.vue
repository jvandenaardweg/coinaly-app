<template>
<div class="card card-100-xs">
  <div class="card-header">
    <h2 class="h5 m-0">Favorite markets ({{ totalFavoriteMarkets }})</h2>
  </div>

  <loader v-if="isLoading"></loader>

  <card-partial-empty
    :is-empty="!isLoadingMarkets && !hasFavoriteMarkets"
    :text="'No favorite markets, yet!'">
  </card-partial-empty>

  <div v-if="hasFavoriteMarkets" class="list-group list-group-flush">
    <router-link :to="marketLink(meta.base, meta.quote)" v-if="!isLoading && isWithinPageLimit(index)" v-for="(meta, symbol, index) in allFavoriteMarkets" :key="symbol" :index="index" class="list-group-item list-group-item-action">
      <list-group-item-market :currency="currencies[meta.base]" :market="meta" :ticker="allTickers[symbol]" :favorite="isFavoriteMarket(symbol)" :hideVolume="true"></list-group-item-market>
    </router-link>
  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '@/components/Loader'
import CardPartialEmpty from '@/components/card/PartialEmpty'
import ListGroupItemMarket from '@/components/list-group-item/Market'

export default {
  name: 'CardMarketsFavorites',
  components: {
    Loader,
    CardPartialEmpty,
    ListGroupItemMarket
  },
  data () {
    return {
      marketIndex: null,
      paginationLimit: 5
    }
  },
  computed: {
    ...mapGetters({
      isLoadingMarkets: 'markets/isLoading',
      isLoadingCurrencies: 'symbols/isLoading',
      isLoadingTickers: 'tickers/isLoading',
      hasMarkets: 'markets/hasMarkets',
      selectedExchange: 'exchanges/selected',
      allFavoriteMarkets: 'markets/allFavoriteMarkets',
      totalFavoriteMarkets: 'markets/totalFavoriteMarkets',
      hasFavoriteMarkets: 'markets/hasFavoriteMarkets',
      userMarketFavorites: 'user/marketFavorites',
      allTickers: 'tickers/allTickers',
      currencies: 'symbols/symbols'
    }),
    isLoading () {
      return this.isLoadingMarkets || this.isLoadingCurrencies || this.isLoadingTickers
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
    marketLink (base, quote) {
      if (base && quote) return `/markets/${quote}/${base}`
      return `/markets/${quote}`
    }
  }
}
</script>
