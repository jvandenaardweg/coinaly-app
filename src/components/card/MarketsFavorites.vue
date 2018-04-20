<template>
<div class="card card-100-xs">
  <div class="card-header">
    <h2 class="h5 m-0">Favorite markets ({{ totalFavoriteMarkets }})</h2>
  </div>

  <CardLoading :is-loading="isLoadingMarkets" :text="'Loading Markets...'"></CardLoading>

  <CardEmpty
    :is-empty="!isLoadingMarkets && !hasFavoriteMarkets"
    :text="'No favorite markets, yet!'">
  </CardEmpty>

  <div v-if="hasFavoriteMarkets" class="list-group list-group-flush">
    <router-link :to="marketLink(meta.base, meta.quote)" v-if="isWithinPageLimit(index)" v-for="(meta, symbol, index) in allFavoriteMarkets" :key="symbol" :index="index" class="list-group-item list-group-item-action">
      <ListGroupItemMarket :market="meta" :ticker="allTickers[symbol]" :favorite="isFavoriteMarket(symbol)" :hideVolume="true"></ListGroupItemMarket>
    </router-link>
  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardLoading from '@/components/card/CardPartialLoading'
import CardEmpty from '@/components/card/CardPartialEmpty'
import ListGroupItemMarket from '@/components/list-group-item/Market'

export default {
  name: 'CardMarketsFavorites',
  components: {
    CardLoading,
    CardEmpty,
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
      hasMarkets: 'markets/hasMarkets',
      selectedExchange: 'exchanges/selected',
      allFavoriteMarkets: 'markets/allFavoriteMarkets',
      totalFavoriteMarkets: 'markets/totalFavoriteMarkets',
      hasFavoriteMarkets: 'markets/hasFavoriteMarkets',
      userMarketFavorites: 'user/marketFavorites',
      allTickers: 'tickers/allTickers'
    })
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
