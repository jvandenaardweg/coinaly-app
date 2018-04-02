<template>
  <div class="card">

    <LoadingCard v-if="!hasBalances" :text="'Loading Balances...'"></LoadingCard>

    <ul v-if="hasBalances" class="list-group list-group-flush">
      <li v-for="(meta, symbol, index) in allFilledCurrencies" :key="symbol" :index="index" class="list-group-item d-flex justify-content-between align-items-center" :class="{'active': quoteCurrency === symbol }" @click="setSelected(symbol)">
        <div class="custom-control custom-radio">
          <img :src="`static/icons/cryptocurrencies/svg/color/${symbol.toLowerCase()}.svg`" width="18" class="mr-1" :alt="symbol" />
          <input type="radio" :id="`quoteCurrency-${symbol}`" :ref="symbol" name="quoteCurrency" v-model="quoteCurrency" :value="symbol" class="custom-control-input">
          <label class="custom-control-label" :for="`quoteCurrency-${symbol}`"><strong>{{ symbol }}</strong> <span class="text-muted">({{ $store.state.symbols[symbol] }})</span></label>
        </div>
        <span class="text-muted"><span>{{ meta.free | number }} {{ symbol }}</span></span>
      </li>
    </ul>
    <div class="card-footer">
      <router-link class="btn btn-primary btn-block" :to="`/${routeBase}/${quoteCurrency}`" :class="{'disabled': !quoteCurrency}" :disabed="!quoteCurrency">{{ nextStepAction }}</router-link>
    </div>
  </div>
</template>

<script>
import LoadingCard from './LoadingCard'

export default {
  name: 'SelectBalance',
  props: ['allFilledCurrencies', 'previousQuoteCurrency', 'nextStepAction', 'routeBase'],
  components: {
    LoadingCard
  },
  data () {
    return {
      quoteCurrency: this.previousQuoteCurrency
    }
  },
  computed: {
    hasBalances () {
      return Object.keys(this.allFilledCurrencies).length
    }
  },
  methods: {
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
