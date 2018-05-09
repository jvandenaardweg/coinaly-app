<template>
  <div id="balances">
    <div class="row">
      <div class="col-md-6">
        <div class="card card-100-xs bg-blue">
          <div class="card-body text-center">
            <h1 class="h1 text-white mb-1 font-weight-bold">&euro; 12.035,51</h1>
            <h2 class="h5 text-light font-weight-normal">2.41231 BTC</h2>
          </div>
        </div>

        <card-balances></card-balances>
      </div>
      <div class="col-md-6">
        <h2>Your recent trades</h2>
        <orders-timeline></orders-timeline>

        <!-- <horizontal-scroller></horizontal-scroller> -->
      </div>
    </div>

    <!-- <div class="row justify-content-center">
      <div class="col-6">
        <card-balances></card-balances>
      </div>
      <div class="col-6">
        <card-balances></card-balances>
      </div>
    </div> -->
  </div>
</template>

<script>
import HorizontalScroller from '@/components/HorizontalScroller'
import CardBalances from '@/components/card/Balances'
import OrdersTimeline from '@/components/OrdersTimeline'

export default {
  name: 'PageBalances',
  components: {
    HorizontalScroller,
    CardBalances,
    OrdersTimeline
  }
}
</script>
