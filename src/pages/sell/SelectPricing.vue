<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <div class="text-left">
        <h1 class="h2 mb-6">Sell {{ quoteCurrency }} for {{ baseCurrency }}</h1>
      </div>
      <div class="card">
        <div class="card-body">
          Balance: {{ quoteCurrency }} <router-link :to="`/sell`" class="btn btn-link btn-sm">Change</router-link><br />
          Market: {{ baseCurrency }} <router-link :to="`/sell/${quoteCurrency}`" class="btn btn-link btn-sm">Change</router-link><br />
          <div class="form-group">
            <label for="exampleInputEmail1"><strong>Price (in {{ quoteCurrency }})</strong></label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <button type="button" class="btn btn-primary btn-sm">+</button>
          <button type="button" class="btn btn-primary btn-sm">-</button>
          <div class="input-group mb-3">
            <input type="text" class="form-control" :placeholder="`Price for 1 ${quoteCurrency} in ${baseCurrency}`" aria-label="Recipient's username" aria-describedby="basic-addon2">
            <div class="input-group-append">
              <span class="input-group-text" id="basic-addon2">{{ quoteCurrency }}</span>
            </div>
          </div>
          <button type="button" class="btn btn-outline-secondary btn-sm">last</button>
          <button type="button" class="btn btn-outline-secondary btn-sm">bid</button>
          <button type="button" class="btn btn-outline-secondary btn-sm">ask</button>
          <button type="button" class="btn btn-outline-secondary btn-sm">24hr low</button>
          <button type="button" class="btn btn-outline-secondary btn-sm">24hr high</button>
          <div class="form-group">
            <label class="font-weight-bold">Amount of {{ baseCurrency }}</label>
            <div class="input-group mb-3">
              <input type="text" class="form-control" :placeholder="`Price for 1 ${quoteCurrency} in ${baseCurrency}`" aria-label="Recipient's username" aria-describedby="basic-addon2">
              <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2">{{ baseCurrency }}</span>
              </div>
            </div>
          </div>
          <button type="button" class="btn btn-outline-secondary btn-sm">10%</button>
          <button type="button" class="btn btn-outline-secondary btn-sm">20%</button>
          <button type="button" class="btn btn-outline-secondary btn-sm">25%</button>
          <button type="button" class="btn btn-outline-secondary btn-sm">50%</button>
          <button type="button" class="btn btn-outline-secondary btn-sm">75%</button>
          <button type="button" class="btn btn-outline-secondary btn-sm">100%</button>
        </div>
        <div class="card-footer">
          <button type="button" class="btn btn-success btn-lg btn-block" @click="steps.secondStep.validated = true" :class="{'disabled': baseCurrency === null}" :disabed="baseCurrency === null">Sell {{ quoteCurrency }} for {{ baseCurrency }}</button>
        </div>
      </div>
    </div>
    <div class="col-md-7">
      <TradingViewChart :exchange="`BITTREX`" :baseCurrency="baseCurrency" :quoteCurrency="quoteCurrency"></TradingViewChart>
    </div>
  </div>
</template>

<script>
import TradingViewChart from '../../components/TradingViewChart.vue'
// import { mapGetters } from 'vuex'

export default {
  name: 'PageSellSelectPricing',
  components: {
    TradingViewChart
  },
  data () {
    return {
      showSmartTradeInfo: false,
      quoteCurrency: this.$route.params.quoteCurrency,
      baseCurrency: this.$route.params.baseCurrency,
      balances: {
        'XVG': {
          free: 1500
        },
        'XLM': {
          free: 1500
        },
        'GVT': {
          free: 1500
        },
        'BTC': {
          free: 1500
        }
      },
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
      },
      steps: {
        firstStep: {
          validated: false
        },
        secondStep: {
          validated: false
        },
        thirdStep: {
          validated: false
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
    handleFirstStepSubmit ($event) {
      $event.preventDefault()
      this.steps.firstStep.validated = true
      console.log('validate first step')
    },
    handleSecondStepSubmit ($event) {
      $event.preventDefault()
      this.steps.secondStep.validated = true
      console.log('validate second step')
    }
  }
}
</script>
