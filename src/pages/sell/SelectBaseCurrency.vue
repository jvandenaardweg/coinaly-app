<template>
  <div class="row justify-content-center">
    <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5">
      <div class="text-center">
        <h1 class="h2 mb-4">Sell {{ $route.params.quoteCurrency }} for {{ baseCurrencyTitle }}</h1>
        <p class="text-muted">The markets below are are tradable with your selected currency.</p>
      </div>
      <div class="card">
        <ul class="list-group list-group-flush">
          <li v-for="(meta, symbol, index) in baseMarkets" :key="symbol" :index="index" class="list-group-item d-flex justify-content-between align-items-center" :class="{'active': baseCurrency === symbol }" @click="setSelected(symbol)">
            <div class="custom-control custom-radio">
              <img :src="`static/icons/cryptocurrencies/svg/color/${symbol.toLowerCase()}.svg`" width="18" class="mr-1" :alt="symbol" />  
              <input type="radio" :id="`baseCurrency-${symbol}`" name="baseCurrency" v-model="baseCurrency" :value="symbol" class="custom-control-input">
              <label class="custom-control-label" :for="`baseCurrency-${symbol}`"><strong>{{ symbol }}</strong> <span class="text-muted">({{ $store.state.symbols[symbol] }})</span></label>
            </div>
            <span class="badge badge-primary badge-pill" v-if="meta.smartMarketTrade">Smart Market Trade</span>
            <span class="text-muted">Max: {{ meta.max }}</span>
          </li>
        </ul>
        <div v-if="baseMarkets[baseCurrency] && baseMarkets[baseCurrency].smartMarketTrade" class="text-left p-4 bg-primary text-white">
          <h3 class="h4 font-weight-bold">About Smart Market Trading</h3>
          <p>With Smart Trading our systems will automatically convert to a currency that's not commonly tradable on an exchange.</p>
          <p>Our systems will market trade {{ $route.params.quoteCurrency }} to BTC first. Once that's done, we will market trade BTC to {{ baseCurrency }}.</p>
          <p><strong>Note:</strong> The fees for an market trade are a little bit higher then an limit trade and the results may vary. So only use this option if you want to get out of the market (exit a trade) fast and are willing to take a little risk.</p>
        </div>
        <div class="card-footer">
          <!-- <router-link class="btn btn-outline-secondary float-left" :to="`/sell/${$route.params.quoteCurrency}`">Previous step</router-link> -->
          <router-link class="btn btn-primary btn-block" :to="`/sell/${$route.params.quoteCurrency}/${baseCurrency}`" :class="{'disabled': baseCurrency === null}" :disabed="baseCurrency === null">Next step: Pricing</router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'PageSellSelectBaseCurrency',
  data () {
    return {
      showSmartTradeInfo: false,
      baseCurrency: (this.$store.state.route.from) ? this.$store.state.route.from.params.baseCurrency : null,
      baseMarkets: {
        'BTC': {
          max: 5000,
          smartMarketTrade: false
        },
        'ETH': {
          max: 5000,
          smartMarketTrade: false
        },
        'USDT': {
          max: 5000,
          smartMarketTrade: true
        }
      }
    }
  },
  computed: {
    baseCurrencyUppercased () {
      return (this.baseCurrency) ? this.baseCurrency.toUpperCase() : null
    },
    baseCurrencyTitle () {
      return (this.baseCurrency) ? this.baseCurrencyUppercased : '...?'
    }
  },
  methods: {
    handleSecondStepSubmit ($event) {
      $event.preventDefault()
      this.steps.secondStep.validated = true
      console.log('validate second step')
    },
    setSelected (symbol) {
      this.baseCurrency = symbol
    }
  }
}
</script>

<style lang="scss" scoped>
.list-group-item,
label {
  cursor: pointer;
}
</style>