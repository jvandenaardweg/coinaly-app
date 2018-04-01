<template>
  <div class="row justify-content-center">
    <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5">
      <div class="text-center">
        <h1 class="h2 mb-4">What are you selling?</h1>
        <p class="text-muted">The currencies below are what's in your current balance.</p>
      </div>
      <div class="card">
        <ul class="list-group list-group-flush">
          <li v-for="(meta, symbol, index) in balances" :key="symbol" :index="index" class="list-group-item d-flex justify-content-between align-items-center" :class="{'active': quoteCurrency === symbol }" @click="setSelected(symbol)">
            <div class="custom-control custom-radio">
              <img :src="`static/icons/cryptocurrencies/svg/color/${symbol.toLowerCase()}.svg`" width="18" class="mr-1" :alt="symbol" />  
              <input type="radio" :id="`quoteCurrency-${symbol}`" name="quoteCurrency" v-model="quoteCurrency" :value="symbol" class="custom-control-input">
              <label class="custom-control-label" :for="`quoteCurrency-${symbol}`"><strong>{{ symbol }}</strong> <span class="text-muted">({{ $store.state.symbols[symbol] }})</span></label>
            </div>
            <span class="text-muted"><span>{{ meta.free }}</span></span>
          </li>
        </ul>
        <div class="card-footer">
          <router-link class="btn btn-primary btn-block" :to="`/sell/${quoteCurrency}`" :class="{'disabled': !quoteCurrency}" :disabed="!quoteCurrency">Next step: Market</router-link>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
export default {
  name: 'PageSellSelectQuoteCurrency',
  data () {
    return {
      quoteCurrency: (this.$store.state.route.from) ? this.$store.state.route.from.params.quoteCurrency : null,
      balances: {
        'XVG': {
          free: 1500
        },
        'XLM': {
          free: 21573
        },
        'GVT': {
          free: 25.0123
        },
        'BTC': {
          free: 1.123464
        }
      }
    }
  },
  methods: {
    handleFirstStepSubmit ($event) {
      $event.preventDefault()
      this.steps.firstStep.validated = true
      console.log('validate first step')
    },
    setSelected (symbol) {
      this.quoteCurrency = symbol
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
