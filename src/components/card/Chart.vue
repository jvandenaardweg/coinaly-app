<template>
  <div class="card card-100-xs">
    <div class="card-body text-center">
      <h1 class="h1 mb-1"><img v-if="iconUrl" :src="iconUrl" ref="icon" width="24" /> {{ marketSymbol }}</h1>
      <div class="text-muted">
        1 {{ baseId }} = {{ tickerLast }} {{ quoteId }}
      </div>
      <loader v-if="isLoading"></loader>
    </div>
    <line-chart
      v-if="!isLoading && chartBackgroundColor"
      :labels="timestamps"
      :data="closes"
      :backgroundColor="chartBackgroundColor"
      :borderColor="chartBorderColor"
      :height="150"></line-chart>
    <div v-if="!isLoading" class="chart-controls" :style="{'background-color': chartBackgroundColor}">
      <button type="button" class="btn btn-white btn-sm">1h</button>
      <button type="button" class="btn btn-white btn-sm">1w</button>
      <button type="button" class="btn btn-white btn-sm">1m</button>
      <button type="button" class="btn btn-white btn-sm">1y</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LineChart from '@/components/charts/Line.js'
import Loader from '@/components/Loader'
import format from 'date-fns/format'
import Chart from 'chart.js'

export default {
  name: 'CardChart',
  components: {
    LineChart,
    Loader
  },
  props: {
    marketSymbol: {
      type: String
    },
    quoteId: {
      type: String
    },
    baseId: {
      type: String
    }
  },
  beforeMount () {
    this.dispatchGetOHLCV(this.marketSymbol)
  },
  data: () => ({
    error: null,
    isLoadingOHLCV: null
  }),
  computed: {
    ...mapGetters({
      ohlcv: 'markets/ohlcv',
      isLoadingMarkets: 'markets/isLoading',
      symbols: 'symbols/symbols',
      isLoadingSymbols: 'symbols/isLoading',
      getTickerBySymbol: 'tickers/getTickerBySymbol'
    }),
    symbolColor () {
      return (this.symbols && this.symbols[this.baseId]) ? this.symbols[this.baseId].color : null
    },
    chartBackgroundColor () {
      if (this.symbolColor) return Chart.helpers.color(this.symbolColor).alpha(0.15).rgbString()
      return Chart.helpers.color('#2E63B1').alpha(0.15).rgbString()
    },
    chartBorderColor () {
      if (this.symbolColor) return this.symbolColor
      return '#2E63B1'
    },
    isLoading () {
      return this.isLoadingOHLCV || this.isLoadingMarkets || this.isLoadingSymbols
    },
    tickerLast () {
      const ticker = this.getTickerBySymbol(this.marketSymbol)
      return (ticker) ? ticker.last : '...'
    },
    iconUrl () {
      if (!this.isLoadingSymbols) {
        const symbol = this.symbols[this.baseId]
        return (symbol) ? symbol.icon_uri : null
      } else {
        return null
      }
    },
    ohlcvData () {
      if (this.marketSymbol) {
        const ohlcv = this.ohlcv[this.marketSymbol]
        if (ohlcv) {
          return ohlcv
          // Returns Array
          // 0 = timestamp
          // 1 = open
          // 2 = high
          // 3 = low
          // 4 = close
          // 5 = volume
          // const index = 4

          // const lastPrice = ohlcv[ohlcv.length - 1][index] // closing price
          // Get an array with only closing prices
          // return ohlcv.slice(-80).map(x => x[index])
        }
      } else {
        return null
      }
    },
    timestamps () {
      if (this.ohlcvData) {
        const timestampIndex = 0
        return this.ohlcvData.slice(-168).map(x => this.formatTimestamp(x[timestampIndex]))
      } else {
        return null
      }
    },
    closes () {
      if (this.ohlcvData) {
        const closeIndex = 4
        return this.ohlcvData.slice(-168).map(x => x[closeIndex].toFixed(8))
      } else {
        return null
      }
    }
  },
  methods: {
    formatTimestamp (timestamp) {
      return format(
        new Date(timestamp),
        'D MMM'
      )
    },
    async dispatchGetOHLCV (marketSymbol, forceRefresh = false) {
      this.isLoadingOHLCV = true

      const payload = {
        marketSymbol: marketSymbol,
        interval: '1h',
        forceRefresh: forceRefresh
      }

      try {
        await this.$store.dispatch('markets/getOHLCV', payload)
      } catch (err) {
        this.error = err
      } finally {
        this.isLoadingOHLCV = false
      }
    }
  },
  watch: {
    marketSymbol (newValue, oldValue) {
      if (newValue !== oldValue && newValue) {
        this.dispatchGetOHLCV(newValue)
      }
    }
  }
}
</script>

<style lang="scss">
.chart-controls {
  display: flex;
  padding-top: rem-calc(15);
  padding-bottom: rem-calc(15);
  left: 0;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;

  .btn {
    margin-left: rem-calc(5);
    margin-right: rem-calc(5);
  }
}
</style>
