<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-10 col-md-10 col-lg-6 col-xl-6">
        <div class="text-center d-none d-sm-block">
          <h1 class="h2 mb-4">What are you selling?</h1>
          <p class="text-muted">The currencies below are what's in your current balance.</p>
        </div>
        <card-select-balance
          :nextStepAction="'Next step: Market'"
          :routeBase="'sell'">
        </card-select-balance>
      </div>
    </div>
  </div>
</template>

<script>
import CardSelectBalance from '@/components/card/CardSelectBalance'

export default {
  name: 'PageSellSelectBase',
  components: {
    CardSelectBalance
  }
}
</script>
