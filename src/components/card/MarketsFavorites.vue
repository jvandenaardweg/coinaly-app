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

  <ul v-if="hasMarkets" class="list-group list-group-flush">
    <li v-if="isWithinPageLimit(index)" v-for="(meta, symbol, index) in allMarkets" :key="symbol" :index="index" class="list-group-item">
      <ListGroupItemMarket :market="meta" :hideVolume="true"></ListGroupItemMarket>
    </li>
  </ul>
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
    }
  }
}
</script>
