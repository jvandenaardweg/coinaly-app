<template>
  <div class="card card-100-xs">

    <div class="card-header">
      <h2 class="h5 m-0">Available markets ({{ totalMarkets }})</h2>
      <SubNav v-if="hasMarkets" class="mt-3" :items="subNavItems" :selected="'all'"></SubNav>
      <div v-if="hasMarkets" class="input-icon mt-3">
        <span class="input-icon-addon">
          <i class="fe fe-user"></i>
        </span>
        <input type="text" class="form-control" placeholder="Search markets...">
      </div>
    </div>

    <CardLoading :is-loading="isLoadingMarkets" :text="'Loading Markets...'"></CardLoading>

    <CardEmpty
      :is-empty="!isLoadingMarkets && !hasMarkets"
      :text="'No markets available.'">
    </CardEmpty>

    <div class="list-group list-group-flush">
      <router-link :to="marketLink(meta.baseId, meta.quoteId)" v-if="isWithinPageLimit(index)" v-for="(meta, symbol, index) in allMarkets" :key="symbol" :index="index" class="list-group-item list-group-item-action">
        <ListGroupItemMarket :market="meta" :ticker="allTickers[symbol]" :favorite="isFavoriteMarket(symbol)" :hideVolume="false"></ListGroupItemMarket>
      </router-link>
    </div>

    <div class="card-footer" v-if="hasMarkets">
      <button type="button" class="btn btn-outline-primary btn-block btn-lg" @click.prevent="handleShowAllMarkets">Show all markets</button>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardLoading from '@/components/card/CardPartialLoading'
import CardEmpty from '@/components/card/CardPartialEmpty'
import SubNav from '@/components/SubNav'
import ListGroupItemMarket from '@/components/list-group-item/Market'

export default {
  name: 'CardMarkets',
  components: {
    CardLoading,
    CardEmpty,
    SubNav,
    ListGroupItemMarket
  },
  data () {
    return {
      marketIndex: null,
      paginationLimit: 20,
      subNavItems: [
        { label: 'All', slug: 'all', uri: '/markets/all' },
        { label: 'BTC', slug: 'btc', uri: '/markets/BTC' },
        { label: 'ETH', slug: 'eth', uri: '/markets/ETH' },
        { label: 'USDT', slug: 'usdt', uri: '/markets/USDT' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      isLoadingMarkets: 'markets/isLoading',
      hasMarkets: 'markets/hasMarkets',
      allMarkets: 'markets/allMarkets',
      totalMarkets: 'markets/totalMarkets',
      allTickers: 'tickers/allTickers',
      selectedExchange: 'exchanges/selected',
      userMarketFavorites: 'user/marketFavorites'
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
    handleShowAllMarkets () {
      this.paginationLimit = 9999
    },
    marketLink (quoteId, baseId) {
      if (baseId && quoteId) return `/markets/${quoteId.toLowerCase()}/${baseId.toLowerCase()}`
      return `/markets/${quoteId.toLowerCase()}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/bootstrap/setting";
@import "~bootstrap/scss/mixins/breakpoints";

.list-group-item,
label {
  cursor: pointer;
}

.card-footer {
  @include media-breakpoint-only(xs) {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    position: fixed;
    background: none;
    left: 0;
    width: 100%;
    bottom: 0;
    border: 0;
  }
}
</style>
