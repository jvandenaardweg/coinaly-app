<template>
<div class="card card-100-xs">
  <div class="card-header">
    <h2 class="h5 m-0">Favorite markets (5)</h2>
  </div>

  <CardLoading :is-loading="isLoadingMarkets" :text="'Loading Markets...'"></CardLoading>

  <CardEmpty
    :is-empty="!isLoadingMarkets && !hasMarkets"
    :text="'No markets available.'">
  </CardEmpty>

  <div v-if="hasMarkets" class="list-group list-group-flush">
    <router-link :to="marketLink(meta.baseId, meta.quoteId)" v-if="isWithinPageLimit(index)" v-for="(meta, symbol, index) in allMarkets" :key="symbol" :index="index" class="list-group-item list-group-item-action">
      <ListGroupItemMarket :market="meta" :hideVolume="true"></ListGroupItemMarket>
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
      allMarkets: 'markets/allMarkets'
    })
  },
  methods: {
    isWithinPageLimit (index) {
      this.marketsIndex = index
      if (index < this.paginationLimit) {
        return true
      } else {
        return false
      }
    },
    marketLink (quoteId, baseId) {
      if (baseId && quoteId) return `/markets/${quoteId.toLowerCase()}/${baseId.toLowerCase()}`
      return `/markets/${quoteId.toLowerCase()}`
    }
  }
}
</script>
