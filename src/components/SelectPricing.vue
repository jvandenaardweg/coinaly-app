<template>
  <div class="card">
    <div class="card-body">
      <!-- {{ activeMarket }} -->
      <div class="form-row">
        <div class="form-group col-6">
          <label for="inputEmail4"><strong>Sell</strong></label>
          <div class="input-group">
            <input type="text" class="form-control" :value="quoteCurrency" disabled>
            <div class="input-group-append">
              <router-link :to="`/sell`" class="btn btn-light">Change</router-link>
            </div>
          </div>
        </div>
        <div class="form-group col-6">
          <label for="inputEmail4"><strong>For</strong></label>
          <div class="input-group">
            <input type="text" class="form-control" :value="baseCurrency" disabled>
            <div class="input-group-append">
              <router-link :to="`/sell/${quoteCurrency}`" class="btn btn-light">Change</router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="alert alert-primary text-center">
        <small>You have {{ amountFreeInBalance | number }} {{ quoteCurrency }} available to sell</small>
      </div>

      <hr />
      <div class="form-group">
        <label for="exampleInputEmail1"><strong>Your sell price for 1 {{ quoteCurrency }} (in {{ baseCurrency }})</strong></label>
        <div class="mb-2">
          <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="handleSetMarketPrice('last')">last</button>
          <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="handleSetMarketPrice('bid')">bid</button>
          <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="handleSetMarketPrice('ask')">ask</button>
          <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="handleSetMarketPrice('low')">24hr low</button>
          <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="handleSetMarketPrice('high')">24hr high</button>
        </div>
        <div class="input-group">
          <input type="text" class="form-control" v-model="price" :placeholder="`Price for 1 ${quoteCurrency} in ${baseCurrency}`" aria-label="Recipient's username" aria-describedby="basic-addon2">
          <div class="input-group-append">
            <span class="input-group-text" id="basic-addon2">{{ baseCurrency }}</span>
            <button class="btn btn-primary" type="button" @click.prevent="handleInputPriceAdjust('increase')">+</button>
            <button class="btn btn-primary" type="button" @click.prevent="handleInputPriceAdjust('decrease')">-</button>
          </div>
        </div>
        <small id="emailHelp" class="form-text text-muted" v-if="price" v-html="belowOrAboveCurrentMarket"></small>
      </div>

      <hr />

      <div class="form-group">
        <label class="font-weight-bold">Amount of {{ quoteCurrency }}</label>
        <div class="mb-2">
          <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="handleInputAmountSetAmountPercentage('sell', 10)">10%</button>
          <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="handleInputAmountSetAmountPercentage('sell', 25)">25%</button>
          <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="handleInputAmountSetAmountPercentage('sell', 50)">50%</button>
          <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="handleInputAmountSetAmountPercentage('sell', 75)">75%</button>
          <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="handleInputAmountSetAmountPercentage('sell', 100)">100%</button>
        </div>
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="amount" :placeholder="`Total ${quoteCurrency} for sale`" aria-label="Recipient's username" aria-describedby="basic-addon2">
          <div class="input-group-append">
            <span class="input-group-text" id="basic-addon2">{{ quoteCurrency }}</span>
            <button class="btn btn-primary" type="button" @click.prevent="roundAmount()">Round</button>
          </div>
        </div>
      </div>

      <hr />

    </div>
    <div class="card-footer">
      <button type="button" class="btn btn-success btn-lg btn-block" :class="{'disabled': baseCurrency === null}" :disabed="baseCurrency === null">Sell {{ quoteCurrency }} for {{ baseCurrency }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectPricing',
  props: ['activeMarket', 'activeBalance', 'quoteCurrency', 'baseCurrency', 'marketSymbol'],
  data () {
    return {
      price: null, // TODO: automatically convert "," to ".",
      amount: null
    }
  },
  computed: {
    amountFreeInBalance () {
      return this.activeBalance[this.quoteCurrency].free
    },
    marketLast () {
      return this.activeMarket[this.marketSymbol].last
    },
    priceMarketDifference () {
      return this.price - this.marketLast
    },
    priceMarketDifferencePercentage () {
      return (((this.priceMarketDifference) / this.marketLast) * 100).toFixed(2)
    },
    belowOrAboveCurrentMarket () {
      if (this.priceMarketDifferencePercentage < 0) {
        return `Your price is ${this.priceMarketDifferencePercentage}% <strong>below</strong> current market.`
      } else if (this.priceMarketDifferencePercentage > 0) {
        return `Your price is ${this.priceMarketDifferencePercentage}% <strong>above</strong> current market.`
      } else {
        return `Your price is <strong>the same</strong> as the current market.`
      }
    }
  },
  methods: {
    handleInputAmountSetAmountPercentage (type, percentage) {
      if (type === 'sell') {
        this.amount = (this.amountFreeInBalance / 100) * percentage
      } else {
        // If we want to buy, the amount is related to the price we give for it
        const amount = (((this.amountFreeInBalance / this.price) / 100) * percentage)
        this.exchangeFee = amount * 0.0025 // TODO: make percentage fee dynamic
        this.amount = (((this.amountFreeInBalance / this.price) / 100) * percentage) - this.exchangeFee
      }
    },
    handleSetMarketPrice (type) {
      this.price = this.activeMarket[this.marketSymbol][type]
    },
    handleInputPriceAdjust (type) {
      const price = parseFloat(this.price)
      const decimals = 8
      const power = Math.pow(0.1, decimals)
      const newPrice = (type === 'increase' ? parseFloat(price + power).toFixed(decimals) : parseFloat(price - power).toFixed(decimals))
      this.price = newPrice
    },
    roundAmount () {
      this.amount = Math.floor(this.amount)
    }
  }
}
</script>
