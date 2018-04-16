<template>
  <div class="row justify-content-center">
    <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5">
      <div class="text-center">
        <h1 class="h2 mb-4">What are you buying?</h1>
        <p class="text-muted">The currencies below are listed on your selected exchange.</p>
      </div>
      <div class="card">
        <div class="card-body">
          <SubNav :items="subNavItems"></SubNav>
        </div>
        <div class="card-footer">
          <div class="input-icon">
            <span class="input-icon-addon">
              <i class="fe fe-user"></i>
            </span>
            <input type="text" class="form-control" placeholder="Search cryptocurrencies...">
          </div>
        </div>
      </div>
      <SelectMarketQuote
        @change="handleChange"
        :quoteCurrencyMarkets="quoteCurrencyMarkets"
        :allFilledCurrencies="allFilledCurrencies"
        :isLoadingMarkets="isLoadingMarkets"
        :previousBaseCurrency="previousBaseCurrency"
        :nextStepAction="'Next step: Using Balance'"
        :routeBase="'sell'">
      </SelectMarketQuote>



      <!-- <ul class="list-group list-group-flush">
        <li v-for="(meta, marketSymbol, index) in quoteCurrencyMarkets" :key="marketSymbol" :index="index" class="list-group-item" :class="{'d-none': !isAvailable(marketSymbol)}">
          <img :src="`static/icons/cryptocurrencies/svg/color/${iconName(marketSymbol)}.svg`" width="18" class="mr-1" :alt="symbol" /> {{ marketSymbol }} {{ isAvailable(marketSymbol) }}
        </li>
      </ul> -->

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SelectMarketQuote from '@/components/SelectMarketQuote'
import SubNav from '@/components/SubNav'
import pickBy from 'lodash/pickBy'

export default {
  name: 'PageSellSelectQuoteCurrency',
  components: {
    SelectMarketQuote,
    SubNav
  },
  data () {
    return {
      previousQuoteCurrency: (this.$store.state.route.from) ? this.$store.state.route.from.params.quoteCurrency : null,
      subNavItems: [
        { label: 'All' },
        { label: 'Available' },
        { label: 'Unavailable' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      allCurrencies: 'balances/allCurrencies',
      allFilledCurrencies: 'balances/allFilledCurrencies',
      allMarkets: 'markets/allMarkets',
      isLoadingMarkets: 'markets/isLoading'
    }),
    quoteCurrencyMarkets () {
      return pickBy(this.allMarkets, (values, marketSymbol) => {
        return Object.keys(this.allFilledCurrencies).includes(marketSymbol.split('/')[1])
      })
    }
  },
  methods: {
    isAvailable (marketSymbol) {
      return Object.keys(this.allFilledCurrencies).includes(marketSymbol.split('/')[1])
    },
    iconName (marketSymbol) {
      return marketSymbol.split('/')[0].toLowerCase()
    },
    handleChange (newBaseCurrency) {
      this.baseCurrencyTitle = newBaseCurrency
    }
  }
}
</script>
