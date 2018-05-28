<template>
  <div class="balances-summary">
    <div class="balances-summary-body">
      <h1 class="h1">{{ totalPriceReadable }}</h1>
      <h2 class="h5" v-html="totalBTCPriceReadable"></h2>
    </div>
    <div class="balances-summary-chart">
      <line-chart
        class="balances-summary-line-chart"
        v-if="chartIsReady"
        :labels="timestamps"
        :data="closes"
        :height="120"
        backgroundColor="rgba(0,0,0,0.2)"
        borderColor="transparent"
        :borderWidth="2"
        :tooltips="true"
        ></line-chart>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LineChart from '@/components/charts/Line.js'
import format from 'date-fns/format'

export default {
  name: 'BalancesSummary',
  components: {
    LineChart
  },
  mounted () {
    // TODO: this method should fire every x minutes
    // So the user sees his balance update in "real time"
    this.$store.dispatch('prices/getAllPricesHistory', {
      baseId: 'BTC',
      quoteId: 'USD',
      interval: '1m'
    })
  },
  computed: {
    ...mapGetters({
      balancesError: 'balances/error',
      hasBalances: 'balances/hasBalances',
      allFilledBalancesTotal: 'balances/allFilledBalancesTotal',
      totalBalancesPrices: 'balances/totalBalancesPrices',
      getPriceBySymbol: 'prices/getPriceBySymbol',
      isLoadingPrices: 'prices/isLoading',
      isLoadingBalances: 'balances/isLoading',
      pricesHistory: 'prices/history'
    }),
    isLoading () {
      return this.isLoadingPrices || this.isLoadingBalances
    },
    hasError () {
      return this.balancesError
    },
    chartIsReady () {
      return this.timestamps && this.closes
    },
    totalPrice () {
      if (this.balancesError) return 'Error'
      if (this.totalBalancesPrices) return this.$options.filters.currency(this.totalBalancesPrices)
      return null
    },
    totalBTCPrice () {
      if (this.balancesError) return this.balancesError
      if (this.totalBalancesPrices && !this.isLoadingPrices) {
        return this.$options.filters.toFixed(this.totalBalancesPrices / this.getPriceBySymbol('BTC').USD)
      } else {
        return null // So an empty price (loading) won't make the layout move
      }
    },
    totalPriceReadable () {
      if (this.totalPrice) {
        return this.totalPrice
      } else if (!this.hasBalances && !this.isLoading) {
        return this.$options.filters.currency('0')
      } else {
        return 'Loading...'
      }
    },
    totalBTCPriceReadable () {
      if (this.totalBTCPrice) {
        return `${this.totalBTCPrice} BTC`
      } else if (!this.hasBalances && !this.isLoading) {
        return '0 BTC'
      } else {
        return 'Getting balance from the exchange'
      }
    },
    timestamps () {
      if (this.pricesHistory['BTC/USD']) {
        return this.pricesHistory['BTC/USD'].map(data => {
          const jsTimestamp = (data.time * 1000)
          return this.formatTimestamp(jsTimestamp)
        })
      } else {
        return null
      }
    },
    closes () {
      if (this.totalBTCPrice && this.pricesHistory['BTC/USD']) {
        return this.pricesHistory['BTC/USD'].map(data => {
          return (data.close * this.totalBTCPrice)
        })
      } else {
        return null
      }
    }
  },
  methods: {
    formatTimestamp (timestamp) {
      return format(
        timestamp,
        'D MMM'
      )
    },
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

  .chart-filter {
    position: absolute;
    bottom: 0;
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    margin-bottom: 10px;
    opacity: 0.5;

    li {
      margin-left: 5px;
      margin-right: 5px;

      button {
        background: none;
        color: $white;
        // text-decoration: underline;
        border: 0;
        padding: 0;
        margin: 0;
        cursor: pointer;
      }
    }
  }
}
</style>
