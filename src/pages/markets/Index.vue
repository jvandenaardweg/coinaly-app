<template>
  <div class="container">
    <div class="row justify-content-center">
      <!-- <div class="col-lg-5 mb-4">
        <card-markets-favorites></card-markets-favorites>
      </div> -->
      <div class="col-lg-7">
        <card-markets></card-markets>
      </div>
    </div>
  </div>
</template>

<script>
import CardMarkets from '@/components/card/Markets'
import CardMarketsFavorites from '@/components/card/MarketsFavorites'

export default {
  name: 'PageMarkets',
  components: {
    CardMarkets,
    CardMarketsFavorites
  },
  data () {
    return { }
  }
}
</script>
