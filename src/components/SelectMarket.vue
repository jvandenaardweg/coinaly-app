<template>
  <div class="card">

    <CardLoading :is-loading="isLoadingMarkets" :text="'Loading Markets...'"></CardLoading>

    <EmptyCard v-if="!isLoadingMarkets && !hasMarkets" :text="`No markets for ${quoteCurrency} on [Bittrex]`"></EmptyCard>

    <ListRadioCurrency
      v-if="!isLoadingMarkets"
      :currencies="quoteCurrencyMarkets"
      :activeCurrency="baseCurrency"
      @selectedCurrency="handleSelectedCurrency">
    </ListRadioCurrency>

    <ul v-if="hasMarkets" class="list-group list-group-flush">
      <li v-for="(meta, symbol, index) in quoteCurrencyMarkets" :key="symbol" :index="index" class="list-group-item d-flex justify-content-between align-items-center" :class="{'active': baseCurrency === marketSymbolToBaseSymbol(symbol) }" @click="setSelected(symbol)">
        <div class="custom-control custom-radio">
          <img :src="`static/icons/cryptocurrencies/svg/color/${marketSymbolToBaseSymbol(symbol).toLowerCase()}.svg`" width="18" class="mr-1" :alt="marketSymbolToBaseSymbol(symbol)" />
          <input type="radio" :id="`baseCurrency-${marketSymbolToBaseSymbol(symbol)}`" name="baseCurrency" v-model="baseCurrency" :value="marketSymbolToBaseSymbol(symbol)" class="custom-control-input">
          <label class="custom-control-label" :for="`baseCurrency-${marketSymbolToBaseSymbol(symbol)}`"><strong>{{ marketSymbolToBaseSymbol(symbol) }}</strong> <span class="text-muted" v-if="fullCurrencyName(symbol)">({{ fullCurrencyName(symbol) }})</span></label>
        </div>
        <span class="badge badge-primary badge-pill" v-if="meta.smartMarketTrade">Smart Market Trade</span>
        <span class="text-muted">~ {{ maxSellPrice(symbol) | number }} {{ marketSymbolToBaseSymbol(symbol) }}</span>
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
      <router-link class="btn btn-primary btn-block" :to="`/${routeBase}/${quoteCurrency}/${baseCurrency}`" :class="{'disabled': !baseCurrency}" :disabed="!baseCurrency">{{ nextStepAction }}</router-link>
    </div>

  </div>
</template>

<script>
import CardLoading from '@/components/CardLoading'
import EmptyCard from '@/components/EmptyCard'
import ListRadioCurrency from '@/components/ListRadioCurrency'

export default {
  name: 'SelectMarket',
  props: [
    'quoteCurrencyMarkets',
    'allFilledCurrencies',
    'allMarkets',
    'isLoadingMarkets',
    'previousBaseCurrency',
    'quoteCurrency',
    'nextStepAction',
    'currencySymbols',
    'routeBase'
  ],
  components: {
    CardLoading,
    EmptyCard,
    ListRadioCurrency
  },
  data () {
    return {
      showSmartTradeInfo: false,
      baseCurrency: this.previousBaseCurrency
    }
  },
  computed: {
    hasMarkets () {
      return Object.keys(this.quoteCurrencyMarkets).length > 0
    }
  },
  methods: {
    setSelected (marketSymbol) {
      this.baseCurrency = this.marketSymbolToBaseSymbol(marketSymbol)
    },
    handleSelectedCurrency (symbol) {
      this.baseCurrency = symbol
    },
    marketSymbolToBaseSymbol (marketSymbol) {
      return marketSymbol.split('/')[1]
    },
    maxSellPrice (marketSymbol) {
      const quoteCurrencyBalance = this.allFilledCurrencies[this.quoteCurrency]
      const quoteCurrencyMarket = this.allMarkets[marketSymbol]
      if (quoteCurrencyBalance && quoteCurrencyMarket) return quoteCurrencyBalance.free * quoteCurrencyMarket.last
      return null
    },
    fullCurrencyName (marketSymbol) {
      const currencyFullName = this.currencySymbols[this.marketSymbolToBaseSymbol(marketSymbol)]
      if (currencyFullName) return currencyFullName
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
