<template>
  <div>
    <!-- <div class="page-header">
      <h1 class="page-title">
        Page: Sell
      </h1>
    </div> -->
    <form name="sell">

      <div class="row justify-content-center" v-show="!steps.firstStep.validated">
        <div class="col-md-5">
          <div class="text-center">
            <h1 class="h2 mb-4">What are you selling?</h1>
            <p class="text-muted">The currencies below are what's in your current balance.</p>
          </div>
          <div class="card">
            <ul class="list-group list-group-flush">
              <li v-for="(meta, symbol, index) in balances" :key="symbol" :index="index" class="list-group-item d-flex justify-content-between align-items-center">
                <div class="custom-control custom-radio">
                  <input type="radio" :id="`quoteCurrency-${symbol}`" name="quoteCurrency" v-model="quoteCurrency" :value="symbol" class="custom-control-input">
                  <label class="custom-control-label" :for="`quoteCurrency-${symbol}`"><strong>{{ symbol }}</strong> ({{ $store.state.symbols[symbol] }})</label>
                </div>
                <span class="badge badge-secondary badge-pill">{{ meta.free }}</span>
              </li>
            </ul>
            <div class="card-footer">
              <button type="button" class="btn btn-primary btn-block" @click="steps.firstStep.validated = true" :class="{'disabled': quoteCurrency === null}" :disabed="quoteCurrency === null">Next step: Market</button>
            </div>
          </div>
        </div>
      </div>

      <div class="row justify-content-center" v-show="steps.firstStep.validated && !steps.secondStep.validated">
        <div class="col-md-5">
          <div class="text-center">
            <h1 class="h2 mb-6">Sell {{ quoteCurrency }} for {{ baseCurrencyTitle }}</h1>
          </div>
          <div class="card">
            <ul class="list-group list-group-flush">
              <li v-for="(meta, symbol, index) in baseMarkets" :key="symbol" :index="index" class="list-group-item d-flex justify-content-between align-items-center">
                <div class="custom-control custom-radio">
                  <input type="radio" :id="`baseCurrency-${symbol}`" name="baseCurrency" v-model="baseCurrency" :value="symbol" class="custom-control-input">
                  <label class="custom-control-label" :for="`baseCurrency-${symbol}`"><strong>{{ symbol }}</strong> ({{ $store.state.symbols[symbol] }})</label>
                </div>
                <span class="badge badge-primary badge-pill" v-if="meta.smartMarketTrade">Smart Market Trade</span>
                <span class="badge badge-secondary badge-pill">Max: {{ meta.max }}</span>
              </li>
            </ul>
            <div v-if="baseMarkets[baseCurrency] && baseMarkets[baseCurrency].smartMarketTrade" class="text-left p-4 bg-primary text-white">
              <h3 class="h4 font-weight-bold">About Smart Market Trading</h3>
              <p>With Smart Trading our systems will automatically convert to a currency that's not commonly tradable on an exchange.</p>
              <p>Our systems will market trade {{ quoteCurrency }} to BTC first. Once that's done, we will market trade BTC to {{ baseCurrency }}.</p>
              <p><strong>Note:</strong> The fees for an market trade are a little bit higher then an limit trade and the results may vary. So only use this option if you want to get out of the market (exit a trade) fast and are willing to take a little risk.</p>
            </div>
            <div class="card-footer">
              <!-- <button type="button" class="btn btn-outline-secondary float-left" @click="steps.firstStep.validated = false">Previous step</button> -->
              <button type="button" class="btn btn-primary btn-block" @click="steps.secondStep.validated = true" :class="{'disabled': baseCurrency === null}" :disabed="baseCurrency === null">Next step: Pricing</button>
            </div>
          </div>
        </div>
      </div>

      <div class="row justify-content-center" v-show="steps.secondStep.validated">
      <!-- <div class="row justify-content-center"> -->
        <div class="col-md-5">
          <div class="text-left">
            <h1 class="h2 mb-6">Sell {{ quoteCurrency }} for {{ baseCurrencyTitle }}</h1>
          </div>
          <div class="card">
            <div class="card-body">
              Balance: ETH [change]<br />
              Market: BTC [change]<br />
              <div class="form-group">
                <label for="exampleInputEmail1"><strong>Price (in {{ quoteCurrency }}</strong></label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <button type="button" class="btn btn-primary btn-sm">+</button>
              <button type="button" class="btn btn-primary btn-sm">-</button>
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
                <div class="input-group-append">
                  <span class="input-group-text" id="basic-addon2">BTC</span>
                </div>
              </div>
              <button type="button" class="btn btn-outline-secondary btn-sm">10%</button>
              <button type="button" class="btn btn-outline-secondary btn-sm">20%</button>
              <button type="button" class="btn btn-outline-secondary btn-sm">25%</button>
              <button type="button" class="btn btn-outline-secondary btn-sm">50%</button>
              <button type="button" class="btn btn-outline-secondary btn-sm">75%</button>
              <button type="button" class="btn btn-outline-secondary btn-sm">100%</button>
              <!-- <button type="button" class="badge badge-light">100%</button> -->
            </div>
            <div class="card-footer">
              <!-- <button type="button" class="btn btn-outline-secondary float-left" @click="steps.firstStep.validated = false">Previous step</button> -->
              <button type="button" class="btn btn-success btn-block" @click="steps.secondStep.validated = true" :class="{'disabled': baseCurrency === null}" :disabed="baseCurrency === null">Sell {{ quoteCurrency }} for {{ baseCurrency }}</button>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <div class="card">
            <img src="http://placehold.it/1280x1024" class="img-fluid" />
          </div>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'PageSell',
  data () {
    return {
      showSmartTradeInfo: false,
      quoteCurrency: null,
      baseCurrency: null,
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
  }
}
</script>
