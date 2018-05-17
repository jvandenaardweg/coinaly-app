<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-10 col-md-10 col-lg-6 col-xl-6">
        <div class="text-center d-none d-sm-block">
          <h1 class="h2 mb-4">What are you buying?</h1>
          <p class="text-muted">The currencies below are listed on your selected exchange.</p>
        </div>
        <card-base-markets></card-base-markets>
      </div>
    </div>
  </div>
</template>

<script>
import CardBaseMarkets from '@/components/card/BaseMarkets'

export default {
  name: 'PageBuySelectBase',
  components: {
    CardBaseMarkets
  }
}
</script>
