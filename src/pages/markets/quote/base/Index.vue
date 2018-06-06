<template>
  <div class="container">

    <div class="card card-100-xs">
      <div class="row data-table">
        <div class="col-4 col-sm-4 col-md-4 col-lg-4">
          <div class="row mb-0">
            <div class="col-12 col-sm-6 col-md-6 col-lg-6 align-self-center">
              <percentage-badge :percentage="getTickerBySymbol(marketSymbol).percentage" class="m-0"></percentage-badge>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-6">
              <strong>last</strong>
              <span>{{ tickerLast }}</span>
            </div>
          </div>
        </div>
        <div class="col-8 col-sm-8 col-md-8 col-lg-8">
          <div class="row mb-0">
            <div class="col-6 col-sm-4 col-md-4 col-lg-3">
              <strong>24hr high</strong>
              <span>{{ ticker24hrHigh }}</span>
            </div>
            <div class="col-6 col-sm-4 col-md-4 col-lg-3">
              <strong>24hr low</strong>
              <span>{{ ticker24hrLow }}</span>
            </div>
            <div class="col-6 col-sm-4 col-md-4 col-lg-3">
              <strong>{{ quoteId }} volume</strong>
              <span>{{ tickerQuoteVolume }}</span>
            </div>
            <div class="col-6 col-sm-4 col-md-4 col-lg-3">
              <strong>{{ baseId }} volume</strong>
              <span>{{ tickerBaseVolume }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="card card-100-xs">
      <div class="card-header">
        <sub-nav :items="subNavItems" class="mt-3 mb-3"></sub-nav>
      </div>
    </div> -->


    <card-chart :marketSymbol="marketSymbol" :baseId="baseId" :quoteId="quoteId" class="mt-3 mb-3"></card-chart>

    <!-- <trading-view-chart v-if="quoteId && baseId" :exchange="exchangeUpperCased" :quoteId="quoteId" :baseId="baseId"></trading-view-chart> -->

    <div class="chart-controls">
        <button type="button" class="btn btn-white btn-sm">1h</button>
        <button type="button" class="btn btn-white btn-sm">1w</button>
        <button type="button" class="btn btn-white btn-sm">1m</button>
        <button type="button" class="btn btn-white btn-sm">1y</button>
      </div>

    <div class="card">
      <div class="card-body">
        <p>display trades in this market</p>
        <p>show candlestick chart</p>
        <p>show order book?</p>
        <p>show market signals from external services?</p>
        <button type="button" class="btn btn-outline-primary">View candlestick chart</button> &nbsp;
        <router-link :disabled="!canBuy" :to="`/buy/${baseId}/${quoteId}`" class="btn btn-primary" :class="{'disabled': !canBuy}"><icon name="download" stroke="#fff"></icon> &nbsp; Buy {{ baseId }}</router-link> &nbsp;
        <router-link :disabled="!canSell" :to="`/sell/${baseId}/${quoteId}`" class="btn btn-primary" :class="{'disabled': !canSell}"><icon name="upload" stroke="#fff"></icon> &nbsp; Sell {{ baseId }}</router-link>
      </div>
    </div>

  </div>
</template>

<script>
import PercentageBadge from '@/components/PercentageBadge'
import { mapGetters } from 'vuex'
import CardChart from '@/components/card/Chart.vue'
import Icon from '@/components/Icon'
import TradingViewChart from '@/components/TradingViewChart'
import SubNav from '@/components/SubNav'

export default {
  name: 'PageMarketsMarket',
  components: {
    CardChart,
    Icon,
    PercentageBadge,
    TradingViewChart,
    SubNav
  },
  computed: {
    ...mapGetters({
      getMarketBySymbol: 'markets/getMarketBySymbol',
      getTickerBySymbol: 'tickers/getTickerBySymbol',
      getSymbolBySymbol: 'symbols/getSymbolBySymbol',
      availableBaseMarkets: 'markets/availableBaseMarkets',
      selectedExchange: 'exchanges/selected'
    }),
    subNavItems () {
      return [
        { label: 'Simple chart', uri: '/markets', slug: 'available' },
        { label: 'Advanced chart', uri: '/buy?filter=unavailable', slug: 'unavailable' }
      ]
    },
    exchangeUpperCased () {
      return this.selectedExchange.toUpperCase()
    },
    baseId () {
      return (this.$route) ? this.$route.params.baseId : null
    },
    quoteId () {
      return (this.$route) ? this.$route.params.quoteId : null
    },
    canSell () {
      // TODO: check if available balance matches trading minimums
      const quoteMarkets = (this.availableQuoteMarkets) ? this.availableQuoteMarkets[this.quoteId] : null
      if (quoteMarkets) return quoteMarkets.length
      return false
    },
    canBuy () {
      // TODO: check if available balance matches trading minimums
      const baseMarkets = (this.availableBaseMarkets) ? this.availableBaseMarkets[this.baseId] : null
      if (baseMarkets) return baseMarkets.length
      return false
    },
    marketSymbol () {
      return (this.$route && this.baseId && this.quoteId) ? `${this.baseId}/${this.quoteId}` : null
    },
    tickerLast () {
      if (this.getTickerBySymbol(this.marketSymbol).last) return this.$options.filters.number(this.getTickerBySymbol(this.marketSymbol).last)
      return '-'
    },
    ticker24hrHigh () {
      if (this.getTickerBySymbol(this.marketSymbol).high) return this.$options.filters.number(this.getTickerBySymbol(this.marketSymbol).high)
      return '-'
    },
    ticker24hrLow () {
      if (this.getTickerBySymbol(this.marketSymbol).low) return this.$options.filters.number(this.getTickerBySymbol(this.marketSymbol).low)
      return '-'
    },
    tickerQuoteVolume () {
      if (this.getTickerBySymbol(this.marketSymbol).quoteVolume) {
        return this.$options.filters.shortNumber(this.getTickerBySymbol(this.marketSymbol).quoteVolume)
      }
      return '-'
    },
    tickerBaseVolume () {
      if (this.getTickerBySymbol(this.marketSymbol).baseVolume) {
        return this.$options.filters.shortNumber(this.getTickerBySymbol(this.marketSymbol).baseVolume)
      }
      return '-'
    }
  },
  methods: {
    handleClickRefresh (event) {
      this.dispatchGetOHLCV(this.marketSymbol, true)
    },
    dispatchGetOHLCV (marketSymbol, forceRefresh = false) {
      const payload = {
        marketSymbol: marketSymbol,
        interval: '1h',
        forceRefresh: forceRefresh
      }
      this.$store.dispatch('markets/getOHLCV', payload)
    }
  }
}
</script>

<style lang="scss">
.table {
  &.table-market {
    tr {
      th, td {
        width: 10%;
      }
    }

    th {
      text-transform: uppercase;
      font-size: rem-calc(14);
    }

    td {
      color: $gray-600;
    }
  }
}

.data-table {
  list-style: none;
  margin: 0;
  padding: rem-calc(15) 0;
  width: 100%;
  margin-bottom: - rem-calc(30);
  align-items: center;
  font-size: rem-calc(16);

  @include media-breakpoint-up(md) {
    font-size: rem-calc(16);
  }

  div {
    margin-bottom: rem-calc(15);
  }

  strong {
    text-transform: uppercase;
    display: block;
    font-size: rem-calc(12);
    font-weight: 700;

    @include media-breakpoint-up(md) {
      font-size: rem-calc(14);
    }
  }

  span {
    display: block;
    color: $gray-600;
    line-height: 1;
  }
}
</style>
