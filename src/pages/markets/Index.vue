<template>
  <div id="page-markets">
    <div class="row justify-content-center">
      <div class="col-lg-5 mb-4">
        <CardMarketsFavorites></CardMarketsFavorites>
      </div>
      <div class="col-lg-7">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
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
