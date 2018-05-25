<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <balances-summary></balances-summary>
        <!-- <div class="card mt-3">
          <div class="card-body">
            <doughnut-chart
            class="balances-summary-line-chart"
            :labels="['BTC', 'USDT', 'TRX', 'IOTA', 'POWR', 'VEN', 'GVT', 'ADA', 'ICX', 'INS']"
            :data="[100, 80, 90, 30, 50, 40, 30, 20, 10, 20]"
            :height="350"
            backgroundColor="rgba(0,0,0,0.2)"
            borderColor="transparent"
            :borderWidth="2"
            :tooltips="false"
            ></doughnut-chart>
          </div>
        </div> -->
      </div>
      <div class="col-md-6">
        <card-balances></card-balances>
      </div>
    </div>
  </div>
</template>

<script>
import CardBalances from '@/components/card/Balances'
import BalancesSummary from '@/components/BalancesSummary'
import DoughnutChart from '@/components/charts/Doughnut.js'

export default {
  name: 'PageBalances',
  components: {
    CardBalances,
    BalancesSummary,
    DoughnutChart
  }
}
</script>
