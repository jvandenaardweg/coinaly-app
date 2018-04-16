<template>
  <div id="markets">
    <!-- <div class="page-header">
      <h1 class="h3 mb-3 text-center">Markets</h1>
    </div> -->
    <div class="row justify-content-center">
      <div class="col-md-5 mb-4">
        <CardMarketsFavorites></CardMarketsFavorites>
      </div>
      <div class="col-md-7">
        <CardMarkets></CardMarkets>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardMarkets from '@/components/card/Markets'
import CardMarketsFavorites from '@/components/card/MarketsFavorites'
import ListGroupItemMarket from '@/components/list-group-item/Market'

export default {
  name: 'PageMarkets',
  components: {
    CardMarkets,
    CardMarketsFavorites,
    ListGroupItemMarket
  },
  data () {
    return {
      marketsIndex: null,
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
