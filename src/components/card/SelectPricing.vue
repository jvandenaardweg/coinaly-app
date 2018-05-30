<template>
  <form name="order" @submit.prevent="handleSubmit($event)" :disabled="isCreating">
    <div class="card">
      <div class="card-body">
        <p class="text-center m-0">You have <strong>{{ amountFreeInBalance | number }} {{ quoteId }}</strong> available.</p>
      </div>
    </div>

    <div class="seperator"></div>

    <div class="card">
      <div class="card-body">
        <fieldset :disabled="isCreating">
          <legend class="sr-only">Price</legend>
          <div class="form-group m-0">
            <label class="d-block text-center mb-2">Your price of 1 {{ baseId }} in {{ quoteId }} <span class="badge badge-secondary">limit</span></label>
            <div class="d-flex justify-content-between">
              <btn-control label="-" @click.native="handleInputPriceAdjust('decrease')" :disabled="!price"></btn-control>
              <input-large class="ml-3 mr-3" name="price" :label="quoteId" v-model="price" placeholder="" v-validate="priceValidationRules"></input-large>
              <btn-control label="+" @click.native="handleInputPriceAdjust('increase')" :disabled="!price"></btn-control>
            </div>
            <invalid-feedback v-if="errors.first('price')" :message="errors.first('price')" ref="orderPriceError" class="text-center"></invalid-feedback>
            <div class="buttons mt-5">
              <button type="button" tabindex="-1" class="btn btn-outline-secondary btn-sm" @click.prevent="handleSetMarketPrice('last')">last</button>
              <button type="button" tabindex="-1" class="btn btn-outline-secondary btn-sm" @click.prevent="handleSetMarketPrice('bid')">bid</button>
              <button type="button" tabindex="-1" class="btn btn-outline-secondary btn-sm" @click.prevent="handleSetMarketPrice('ask')">ask</button>
              <button type="button" tabindex="-1" class="btn btn-outline-secondary btn-sm" @click.prevent="handleSetMarketPrice('low')">low</button>
              <button type="button" tabindex="-1" class="btn btn-outline-secondary btn-sm" @click.prevent="handleSetMarketPrice('high')">high</button>
            </div>
            <small class="form-text text-muted mt-3 text-center" v-html="belowOrAboveCurrentMarket"></small>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="seperator"></div>

    <div class="card">
      <div class="card-body">
        <fieldset :disabled="isCreating">
          <legend class="sr-only">Amount</legend>
          <div class="form-group m-0">
            <label class="d-block text-center mb-2">Amount of {{ baseId }} to {{ side }}</label>
            <div class="d-flex">
              <!-- <btn-control label="-" @click.native="handleInputPriceAdjust('decrease')"></btn-control> -->
              <input-large class="ml-5 mr-5" name="amount" :label="baseId" v-model="amount" placeholder="" v-validate="amountValidationRules"></input-large>
              <!-- <btn-control label="+" @click.native="handleInputPriceAdjust('increase')"></btn-control> -->
            </div>
            <invalid-feedback v-if="errors.first('amount')" :message="errors.first('amount')" ref="orderAmountError" class="text-center"></invalid-feedback>
            <div class="buttons mt-5">
              <button type="button" tabindex="-1" class="btn btn-outline-secondary btn-sm" @click.prevent="handleInputAmountSetAmountPercentage(0.10)">10%</button>
              <button type="button" tabindex="-1" class="btn btn-outline-secondary btn-sm" @click.prevent="handleInputAmountSetAmountPercentage(0.25)">25%</button>
              <button type="button" tabindex="-1" class="btn btn-outline-secondary btn-sm" @click.prevent="handleInputAmountSetAmountPercentage(0.50)">50%</button>
              <button type="button" tabindex="-1" class="btn btn-outline-secondary btn-sm" @click.prevent="handleInputAmountSetAmountPercentage(0.75)">75%</button>
              <button type="button" tabindex="-1" class="btn btn-outline-secondary btn-sm" @click.prevent="handleInputAmountSetAmountPercentage(1)">100%</button>
              <button type="button" tabindex="-1" class="btn btn-outline-secondary btn-sm" @click.prevent="roundAmount()" :disabled="!canUseRound">Round</button>
            </div>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="seperator"></div>

    <div class="card bg-blue text-white">
      <div class="card-body">
        <fieldset :disabled="isCreating">
          <ul class="list-unstyled">
            <li class="d-flex">
              <span class="font-weight-bold">Total {{ side }} {{ baseId }}:</span>
              <span class="ml-auto">{{ correctedAmount | number }} {{ baseId }}</span>
            </li>
            <li class="d-flex pt-2">
              <span class="font-weight-bold">Price per {{ baseId }}:</span>
              <span class="ml-auto"> {{ correctedPrice }} {{ quoteId }}</span>
            </li>
            <li class="d-flex pt-2 pb-2">
              <span class="font-weight-bold">Exchange fee:</span>
              <span class="ml-auto">{{ totalFee | toFixed }} {{ quoteId }}</span>
            </li>
            <li class="d-flex border-top pt-2">
              <span class="font-weight-bold">{{ labelTotalPrice }}</span>
              <span class="ml-auto">{{ totalPrice }} {{ quoteId }}</span>
            </li>
            <li class="d-flex pt-2">
              <span class="font-weight-bold">You get</span>
              <span class="ml-auto">{{ amount | number }} {{ baseId }}</span>
            </li>
          </ul>
          <div class="alert alert-danger" v-if="localError">
            {{ localError }}
          </div>
          <button type="submit" class="btn btn-success btn-lg btn-block" :class="{'disabled': isDisabled, 'is-loading': isCreating }" :disabed="isDisabled">{{ side }} {{ baseId }} with {{ quoteId }}</button>
        </fieldset>
      </div>
    </div>

  </form>
</template>

<script>
import BtnControl from '@/components/btn/Control'
import InputLarge from '@/components/form/InputLarge'
import InvalidFeedback from '@/components/form/InvalidFeedback'

export default {
  name: 'CardSelectPricing',
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    InvalidFeedback,
    BtnControl,
    InputLarge
  },
  props: {
    market: {
      type: Object,
      required: true
    },
    balance: {
      type: Object,
      required: true
    },
    ticker: {
      type: Object,
      required: true
    },
    prices: {
      type: Object,
      required: true
    },
    side: {
      type: String,
      required: true,
      validator: (value) => {
        return ['buy', 'sell'].indexOf(value) !== -1
      }
    }
  },
  data: () => ({
    orderType: 'limit',
    price: null,
    amount: null,
    isCreating: null,
    localError: null
  }),
  computed: {
    correctedPrice () {
      // We take the user input and make sure the price has the correct decimals the exchange expects
      if (this.price) return +(parseFloat(this.price)).toFixed(this.marketPrecisionPrice)
      return 0
    },
    correctedAmount () {
      // We take the user input and make sure the amount has the correct decimals the exchange expects
      if (this.amount) return +(parseFloat(this.amount)).toFixed(this.marketPrecisionAmount)
      return 0
    },
    canTrade () {
      return this.totalPrice <= this.amountFreeInBalance
    },
    amountValidationRules () {
      let rules = []

      rules.push('required')
      rules.push('decimal')

      if (this.marketLimits.amount.min) {
        rules.push(`min_value:${this.marketLimits.amount.min}`)
      }

      if (this.marketLimits.amount.max) {
        rules.push(`max_value:${this.marketLimits.amount.max}`)
      }

      return rules.join('|')
    },
    priceValidationRules () {
      let rules = []

      rules.push('required')
      rules.push('decimal')

      if (this.marketLimits.price.min) {
        rules.push(`min_value:${this.marketLimits.price.min}`)
      }

      if (this.marketLimits.price.max) {
        rules.push(`max_value:${this.marketLimits.price.max}`)
      }

      return rules.join('|')
    },
    marketLimits () {
      return this.market.limits
    },
    marketPrecisionPrice () {
      if (this.market.precision && this.market.precision.price) return this.market.precision.price
      return 8
    },
    marketPrecisionAmount () {
      if (this.market.precision && this.market.precision.amount) return this.market.precision.amount
      return 8
    },
    marketPrecisionQuote () {
      if (this.market.precision && this.market.precision.quote) return this.market.precision.quote
      return 8
    },
    marketPrecisionBase () {
      if (this.market.precision && this.market.precision.base) return this.market.precision.base
      return 8
    },
    fiatPricing () {
      return this.prices[this.quoteId]
    },
    quoteId () {
      if (this.market) return this.market.quoteId
      return null
    },
    baseId () {
      if (this.market) return this.market.baseId
      return null
    },
    fee () {
      // TODO: is this correct?
      if (this.orderType === 'limit') {
        return this.market.maker
      } else {
        return this.market.taker
      }
    },
    marketSymbol () {
      return this.market.symbol
    },
    amountFreeInBalance () {
      if (this.balance) return this.balance.free
      return 0
    },
    tickerLast () {
      return this.ticker.last
    },
    priceMarketDifference () {
      return this.price - this.tickerLast
    },
    priceMarketDifferencePercentage () {
      return (((this.priceMarketDifference) / this.tickerLast) * 100).toFixed(2)
    },
    belowOrAboveCurrentMarket () {
      if (!this.price) return '&nbsp;'
      if (this.priceMarketDifferencePercentage < 0) {
        return `Your price is ${this.priceMarketDifferencePercentage}% <strong>below</strong> last market price.`
      } else if (this.priceMarketDifferencePercentage > 0) {
        return `Your price is ${this.priceMarketDifferencePercentage}% <strong>above</strong> last market price.`
      } else {
        return `Your price is <strong>the same</strong> as the last market price.`
      }
    },
    totalPrice () {
      if (this.price && this.amount) {
        return Math.round(this.amount * this.price * Math.pow(10, 8)) / Math.pow(10, 8)
      }
      return 0
    },
    totalFiatPrice () {
      return this.totalPrice * this.fiatPricing.USD
    },
    labelTotalPrice () {
      if (this.side === 'buy') {
        return 'You pay:'
      } else {
        return 'You get:'
      }
    },
    totalFee () {
      return (this.price * this.amount) * this.fee
    },
    isDisabled () {
      return this.errors.items.length || !this.price || !this.amount || !this.canTrade || this.isCreating
    },
    canUseRound () {
      return this.amount > 1
    }
  },
  methods: {
    handleInputAmountSetAmountPercentage (percentage) {
      let amount
      if (this.side === 'sell') {
        this.amount = (this.amountFreeInBalance * percentage)
      } else {
        // If we want to buy, the amount is related to the price we give for it
        // amount = (this.amountFreeInBalance / this.price) * percentage

        // Round to floor, so we can be sure the amount is accepted by the exchange
        amount = Math.floor(((this.amountFreeInBalance / this.price) * percentage) * Math.pow(10, this.marketPrecisionAmount)) / Math.pow(10, this.marketPrecisionAmount)
        this.exchangeFee = amount * this.fee

        // console.log((this.amountFreeInBalance / this.price) / Math.pow(10, 8))
        // Because of rounding, you almost always end up with a small amount left in your balance
        // The "+" in front of it makes sure we don't put in a String
        this.amount = amount

        // console.log(Math.round(this.amount * this.price * Math.pow(10, this.marketPrecisionBase)) / Math.pow(10, this.marketPrecisionBase))
        // this.amount = +(amount)
      }
    },
    handleSetMarketPrice (type) {
      this.price = this.ticker[type]
    },
    handleInputPriceAdjust (type) {
      const price = parseFloat(this.price)
      if (price) {
        const priceString = this.price.toString()
        // If the price includes a decimal number, we want to increase/decrease that decimal number
        if (priceString.includes('.')) {
          const decimals = priceString.split('.')[1].length || this.marketPrecisionPrice // Determine the amount of decimals in the price, so we can increase/decrease the correct decimals
          const power = Math.pow(0.1, decimals) // Increase/decrease by what amount
          const newPrice = (type === 'increase' ? parseFloat(price + power).toFixed(decimals) : parseFloat(price - power).toFixed(decimals))
          this.price = +newPrice
        } else {
          this.price = (type === 'increase') ? price + 1 : price - 1
        }
      } else {
        this.price = (type === 'increase') ? price + 1 : price - 1
      }
    },
    roundAmount () {
      if (this.canUseRound) this.amount = Math.floor(this.amount)
    },
    async handleSubmit () {
      this.localError = null
      if (this.canTrade) {
        this.isCreating = true
        try {
          // Validate the form fields before submitting
          const result = await this.$validator.validateAll()
          if (result) {
            // The payload for the order creation
            // Only contains data the API needs
            // Need to make sure this is 100% correct
            const payload = {
              side: this.side,
              amount: this.correctedAmount,
              price: this.correctedPrice,
              symbol: this.marketSymbol
            }

            if (this.orderType === 'limit') {
              await this.dispatchCreateLimitOrder(payload)
            } else if (this.orderType === 'market') {
              await this.dispatchCreateMarketOrder(payload)
            }
          }
        } catch (err) {
          this.localError = err
          console.log('Error while creating order', err)
        } finally {
          this.isCreating = false
        }
      } else {
        console.log('Cannot trade with', this.amount, this.price)
      }
    },
    async dispatchCreateLimitOrder (payload) {
      try {
        const result = await this.$store.dispatch('orders/createLimitOrder', payload)
        if (result.id) {
          await this.dispatchGetAllOpenOrders()
          this.redirectToOrder(result.id)
        }
      } catch (err) {
        throw err
      }
    },
    dispatchGetAllOpenOrders () {
      return this.$store.dispatch('orders/getAllOpenOrders', {forceRefresh: true})
    },
    async dispatchCreateMarketOrder (payload) {
      // TODO: still have to make this, does nothing for now
      try {
        console.log('dispatch market order', payload)
      } catch (err) {
        console.log(err)
      }
    },
    redirectToOrder (orderId) {
      // We ignore the orderId for now and just
      this.$router.push({
        // path: `/orders/${orderId}`
        path: `/orders`
      })
    }
  }
}
</script>

<style lang="scss">
.zigzag {
  position: relative;
  padding: 1.5rem 1rem;
  background: $primary;
  color: $white;
}

.buttons {
  display: flex;
  justify-content: center;

  .btn {
    width: 100%;
    margin-right: 2px;
    margin-left: 2px;

    // Remove the focus, so it doesnt look like the button is "active" in any way
    // Or else it could be confusing for the user
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
}

.seperator {
  background:$gray-400;
  width:2px;
  height:15px;
  margin:0 auto;
}
</style>
