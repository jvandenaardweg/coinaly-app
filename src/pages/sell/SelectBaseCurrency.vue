<template>
  <div class="row justify-content-center">
    <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5">
      <div class="text-center">
        <h1 class="h2 mb-4">Sell {{ quoteCurrency }} for {{ baseCurrencyTitle }}</h1>
        <p class="text-muted">The markets below are are tradable with your selected currency.</p>
      </div>
      <div class="card">
        <ul class="list-group list-group-flush">
          <li v-for="(meta, symbol, index) in quoteCurrencyMarkets" :key="symbol" :index="index" class="list-group-item d-flex justify-content-between align-items-center" :class="{'active': baseCurrency === symbol }" @click="setSelected(symbol)">
            <div class="custom-control custom-radio">
              <img :src="`static/icons/cryptocurrencies/svg/color/${marketNameToSymbol(symbol).toLowerCase()}.svg`" width="18" class="mr-1" :alt="marketNameToSymbol(symbol)" />
              <input type="radio" :id="`baseCurrency-${marketNameToSymbol(symbol)}`" name="baseCurrency" v-model="baseCurrency" :value="marketNameToSymbol(symbol)" class="custom-control-input">
              <label class="custom-control-label" :for="`baseCurrency-${marketNameToSymbol(symbol)}`"><strong>{{ marketNameToSymbol(symbol) }}</strong> <span class="text-muted">({{ $store.state.symbols[marketNameToSymbol(symbol)] }})</span></label>
            </div>
            <span class="badge badge-primary badge-pill" v-if="meta.smartMarketTrade">Smart Market Trade</span>
            <span class="text-muted">~ {{ maxSellPrice(symbol) | number }} {{ marketNameToSymbol(symbol) }}</span>
          </li>
        </ul>
        <div v-if="quoteCurrencyMarkets[baseCurrency] && quoteCurrencyMarkets[baseCurrency].smartMarketTrade" class="text-left p-4 bg-primary text-white">
          <h3 class="h4 font-weight-bold">About Smart Market Trading</h3>
          <p>With Smart Market Trading our systems will automatically <strong>market trade</strong> to a currency that's not commonly tradable on an exchange.</p>
          <p><a href="#" class="text-white font-weight-bold">Read more</a></p>
          <!-- <p>Our systems will market trade {{ quoteCurrency }} to BTC first. Once that's done, we will market trade BTC to {{ baseCurrency }}.</p> -->
          <p><strong>Note:</strong> Market Trading has higher exchange fee's. So only use this option if you want to get out of the market (exit a trade) fast and are willing to take a little risk.</p>
        </div>
        <div class="card-footer">
          <router-link class="btn btn-primary btn-block" :to="`/sell/${quoteCurrency}/${baseCurrency}`" :class="{'disabled': !baseCurrency}" :disabed="!baseCurrency">Next step: Pricing</router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import pickBy from 'lodash/pickBy'

export default {
  name: 'PageSellSelectBaseCurrency',
  data () {
    return {
      showSmartTradeInfo: false,
      baseCurrency: (this.$store.state.route.from) ? this.$store.state.route.from.params.baseCurrency : null,
      quoteCurrency: this.$store.state.route.params.quoteCurrency,
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
    ...mapGetters({
      allCurrencies: 'balances/allCurrencies',
      allFilledCurrencies: 'balances/allFilledCurrencies',
      allCurrenciesTotal: 'balances/allCurrenciesTotal',
      allFilledCurrenciesTotal: 'balances/allFilledCurrenciesTotal',
      allMarkets: 'markets/allMarkets'
    }),
    quoteCurrencyMarkets () {
      return pickBy(this.allMarkets, (values, marketSymbol) => {
        return marketSymbol.includes(`${this.quoteCurrency}/`)
      })
    },
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
    },
    marketNameToSymbol (marketName) {
      return marketName.split('/')[1]
    },
    maxSellPrice (marketSymbol) {
      const quoteCurrencyBalance = this.allFilledCurrencies[this.quoteCurrency]
      const quoteCurrencyMarket = this.allMarkets[marketSymbol]
      if (quoteCurrencyBalance && quoteCurrencyMarket) return quoteCurrencyBalance.free * quoteCurrencyMarket.last
      return null
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
