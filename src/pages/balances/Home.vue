<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <balances-summary></balances-summary>
        <card-balances></card-balances>
      </div>
      <div class="col-md-6">
        <h2>Your recent trades</h2>
        <orders-timeline></orders-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import HorizontalScroller from '@/components/HorizontalScroller'
import CardBalances from '@/components/card/Balances'
import OrdersTimeline from '@/components/OrdersTimeline'
import BalancesSummary from '@/components/BalancesSummary'

export default {
  name: 'PageBalances',
  components: {
    HorizontalScroller,
    CardBalances,
    OrdersTimeline,
    BalancesSummary
  }
}
</script>
