<template>
  <div class="balances-summary">
    <div class="balances-summary-body">
      <h1 class="h1">{{ totalPrice }}</h1>
      <h2 class="h5" v-html="totalBTCPrice"></h2>
    </div>
    <div class="balances-summary-chart">
      <line-chart
        class="balances-summary-line-chart"
        v-if="!isLoading"
        :labels="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
        :data="[100, 80, 90, 30, 50, 40, 30, 20, 10, 20, 100, 80, 90, 30, 50, 40, 30, 20, 10, 20]"
        :height="120"
        backgroundColor="rgba(0,0,0,0.2)"
        borderColor="transparent"
        :borderWidth="2"
        :tooltips="false"
        ></line-chart>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LineChart from '@/components/charts/Line.js'

export default {
  name: 'BalancesSummary',
  components: {
    LineChart
  },
  computed: {
    ...mapGetters({
      balancesError: 'balances/error',
      totalBalancesPrices: 'balances/totalBalancesPrices',
      getPriceBySymbol: 'prices/getPriceBySymbol',
      isLoadingPrices: 'prices/isLoading',
      isLoadingBalances: 'balances/isLoading'
    }),
    isLoading () {
      return this.isLoadingPrices || this.isLoadingBalances
    },
    totalPrice () {
      if (this.balancesError) return 'Error'
      if (this.totalBalancesPrices) return this.$options.filters.currency(this.totalBalancesPrices)
      return 'Loading...'
    },
    totalBTCPrice () {
      if (this.balancesError) return this.balancesError
      if (this.totalBalancesPrices && !this.isLoadingPrices) {
        return this.$options.filters.toFixed(this.totalBalancesPrices / this.getPriceBySymbol('BTC').USD) + ' BTC'
      } else {
        return '&nbsp;' // So an empty price (loading) won't make the layout move
      }
    }
  }
}
</script>

<style lang="scss">
.balances-summary {
  background-color: $blue;
  border-radius: $border-radius;
  color: $white;
  position: relative;

  @include media-breakpoint-only(xs) {
    margin-left: -0.75rem;
    margin-right: -0.75rem;
    border-radius: 0;
    border-left: 0;
    border-right: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .balances-summary-body {
    text-align: center;
    padding: 2rem 3rem;

    @include media-breakpoint-up(md) {
      padding: 3rem;
    }

    h1 {
      margin-bottom: 0.3rem;
      font-weight: bold;
    }

    h2 {
      opacity: 0.5;
      font-weight: normal;
      margin-bottom: 0;
    }
  }

  .balances-summary-chart {
    // position: absolute;
    // top: 0;
    // left: 0;
    width: 100%;
    margin-top: -2rem;
    height: 120px;
    object-fit: contain;
    position: relative;

    .balances-summary-line-chart {
      width: 100%;
      height: 120px;

      canvas {
        height: 120px !important;
      }
    }
  }
}
</style>
