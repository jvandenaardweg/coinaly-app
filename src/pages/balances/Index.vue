<template>
  <div id="balances">
    <div class="row">
      <div class="col-md-6">
        <div class="card card-100-xs bg-blue h-100" style="margin-top:-1.30rem;">
          <div class="card-body text-center">
            <h1 class="h1 text-white mb-1 font-weight-bold">&euro; 12.035,51</h1>
            <h2 class="h5 text-light font-weight-normal">2.41231 BTC</h2>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <HorizontalScroller></HorizontalScroller>
      </div>
    </div>



    <div class="row justify-content-center">
      <div class="col">

         <line-chart :data="chartData" :options="{responsive: true, maintainAspectRatio: true}"></line-chart>


        <div class="card mt-4">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">ADA/BTC</li>
            <li class="list-group-item">ADA/BTC</li>
            <li class="list-group-item">ADA/BTC</li>
            <li class="list-group-item">ADA/BTC</li>
            <li class="list-group-item">ADA/BTC</li>
          </ul>
        </div>
<!--
        <div class="card">
          <div class="card-body">body</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/charts/LineChart.js'
import HorizontalScroller from '@/components/HorizontalScroller'

export default {
  name: 'PageBalances',
  components: {
    HorizontalScroller,
    LineChart
  },
  computed: {
    chartData () {
      return {
        data: [
          {
            x: 10,
            y: 20
          }, {
            x: 15,
            y: 10
          }
        ]
      }
    }
  }
}
</script>
