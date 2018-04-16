<template>
  <div id="markets">
    <div class="page-header">
      <h1 class="h3 mb-3 text-center">Markets</h1>
    </div>
    <div class="row justify-content-center">
      <div class="col-7">
        <CardMarkets></CardMarkets>
      </div>
    </div>
  </div>
</template>

<script>
import CardMarkets from '@/components/card/CardMarkets'

export default {
  name: 'PageMarkets',
  components: {
    CardMarkets
  }
}
</script>
