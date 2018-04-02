<template>
  <div class="card">

    <LoadingCard v-if="isLoadingMarkets" :text="'Loading Markets...'"></LoadingCard>

    <EmptyCard v-if="!isLoadingMarkets && !hasMarkets" :text="`No markets for ${quoteCurrency}`"></EmptyCard>

    <ul v-if="hasMarkets" class="list-group list-group-flush">
      <li v-for="(meta, symbol, index) in quoteCurrencyMarkets" :key="symbol" :index="index" class="list-group-item d-flex justify-content-between align-items-center" :class="{'active': baseCurrency === marketNameToSymbol(symbol) }" @click="setSelected(symbol)">
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
      <router-link class="btn btn-primary btn-block" :to="`/sell/${quoteCurrency}/${baseCurrency}`" :class="{'disabled': !baseCurrency}" :disabed="!baseCurrency">{{ nextStepAction }}</router-link>
    </div>

  </div>
</template>

<script>
import LoadingCard from './LoadingCard'
import EmptyCard from './EmptyCard'

export default {
  name: 'SelectMarket',
  props: [
    'quoteCurrencyMarkets',
    'allFilledCurrencies',
    'allMarkets',
    'isLoadingMarkets',
    'previousBaseCurrency',
    'quoteCurrency',
    'nextStepAction'
  ],
  components: {
    LoadingCard,
    EmptyCard
  },
  data () {
    return {
      showSmartTradeInfo: false,
      baseCurrency: this.previousBaseCurrency
    }
  },
  computed: {
    hasMarkets () {
      return Object.keys(this.quoteCurrencyMarkets).length
    }
  },
  methods: {
    setSelected (marketName) {
      this.baseCurrency = this.marketNameToSymbol(marketName)
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
  },
  watch: {
    'baseCurrency': function (newValue, oldValue) {
      this.$emit('change', newValue)
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
