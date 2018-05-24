<template>
  <div class="card card-100-xs">
    <form name="order" @submit.prevent="handleSubmit($event)">
      <div class="card-body">
        <p class="text-success text-center">You have <strong>{{ amountFreeInBalance | number }} {{ baseId }}</strong> available to {{ context }}</p>

        <div class="form-group mb-5">
          <label>Order type</label>
          <select class="custom-select custom-select-lg"
            id="orderType"
            :class="{ 'is-invalid': errors.has('orderType') }"
            name="orderType"
            v-model="orderType"
            v-validate="'required'">
            <option :value="'limit'">Limit (conditional, lower fee)</option>
            <option :value="'market'">Market (instant, higher fee)</option>
          </select>
          <invalid-feedback v-show="errors.has('orderType')" :message="errors.first('orderType')" ref="orderTypeError"></invalid-feedback>
        </div>

        <!-- <hr /> -->
        <div class="form-group mb-5">
          <label for="exampleInputEmail1">{{ labelPrice }}</label>
          <div class="buttons">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="handleSetMarketPrice('last')">last</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="handleSetMarketPrice('bid')">bid</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="handleSetMarketPrice('ask')">ask</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="handleSetMarketPrice('low')">24hr low</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="handleSetMarketPrice('high')">24hr high</button>
          </div>
          <div class="input-group">
            <input type="text" class="form-control form-control-lg" v-model="price" :placeholder="`Price for 1 ${baseId} in ${quoteId}`" aria-label="Recipient's username" aria-describedby="basic-addon2">
            <div class="input-group-append">
              <span class="input-group-text" id="basic-addon2">{{ quoteId }}</span>
              <button class="btn btn-primary" type="button" @click.prevent="handleInputPriceAdjust('increase')">+</button>
              <button class="btn btn-primary" type="button" @click.prevent="handleInputPriceAdjust('decrease')">-</button>
            </div>
          </div>
          <small id="emailHelp" class="form-text text-muted" v-if="price" v-html="belowOrAboveCurrentMarket"></small>
        </div>

        <!-- <hr /> -->

        <div class="form-group mb-5">
          <label>Amount of {{ baseId }}</label>
          <div class="buttons">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="handleInputAmountSetAmountPercentage('sell', 10)">10%</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="handleInputAmountSetAmountPercentage('sell', 25)">25%</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="handleInputAmountSetAmountPercentage('sell', 50)">50%</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="handleInputAmountSetAmountPercentage('sell', 75)">75%</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="handleInputAmountSetAmountPercentage('sell', 100)">100%</button>
          </div>
          <div class="input-group mb-3">
            <input type="text" class="form-control form-control-lg" v-model="amount" :placeholder="`Total ${baseId} for sale`" aria-label="Recipient's username" aria-describedby="basic-addon2">
            <div class="input-group-append">
              <span class="input-group-text" id="basic-addon2">{{ baseId }}</span>
              <button class="btn btn-primary" type="button" @click.prevent="roundAmount()">Round</button>
            </div>
          </div>
        </div>

        <!-- <hr /> -->

        <div class="zigzag">
          <ul class="list-unstyled">
            <li class="d-flex">
              <span class="font-weight-bold">Total {{ baseId }}:</span>
              <span class="ml-auto">{{ amount | number }} {{ baseId }}</span>
            </li>
            <li class="d-flex pt-2">
              <span class="font-weight-bold">Price per {{ baseId }}:</span>
              <span class="ml-auto"> {{ price }} {{ quoteId }}</span>
            </li>
            <li class="d-flex pt-2 pb-2">
              <span class="font-weight-bold">Exchange fee:</span>
              <span class="ml-auto">{{ totalFee | toFixed }} {{ quoteId }}</span>
            </li>
            <li class="d-flex border-top pt-2">
              <span class="font-weight-bold">You get:</span>
              <span class="ml-auto">{{ totalPrice | toFixed }} {{ quoteId }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="card-footer">
        <button type="submit" class="btn btn-success btn-lg btn-block" :class="{'disabled': disableSubmitButton}" :disabed="disableSubmitButton">{{ context }} {{ baseId }} for {{ quoteId }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import InvalidFeedback from '@/components/form/InvalidFeedback'

export default {
  name: 'CardSelectPricing',
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    InvalidFeedback
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
    context: {
      type: String,
      required: true,
      validator: (value) => {
        return ['buy', 'sell'].indexOf(value) !== -1
      }
    }
  },
  data: () => ({
    orderType: 'limit',
    price: null, // TODO: automatically convert "," to ".",
    amount: null
  }),
  computed: {
    labelPrice () {
      return `Your ${this.context} price for 1 ${this.baseId} (in ${this.quoteId})`
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
    marketLast () {
      return this.ticker.last
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
    },
    totalPrice () {
      return (this.price * this.amount) + ((this.price * this.amount) * this.fee)
    },
    totalFee () {
      return (this.price * this.amount) * this.fee
    },
    disableSubmitButton () {
      return !this.amountFreeInBalance || !this.price || !this.amount
    }
  },
  methods: {
    handleInputAmountSetAmountPercentage (type, percentage) {
      if (type === 'sell') {
        this.amount = (this.amountFreeInBalance / 100) * percentage
      } else {
        // If we want to buy, the amount is related to the price we give for it
        const amount = (((this.amountFreeInBalance / this.price) / 100) * percentage)
        this.exchangeFee = amount * this.fee
        this.amount = (((this.amountFreeInBalance / this.price) / 100) * percentage) - this.exchangeFee
      }
    },
    handleSetMarketPrice (type) {
      this.price = this.ticker[type]
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
    },
    handleSubmit () {
      const payload = {
        orderType: this.orderType,
        context: this.context,
        amount: this.amount,
        price: this.price,
        market: this.marketSymbol
      }

      // eslint-disable-next-line
      console.log('Send this', payload)
    }
  }
}
</script>

<style lang="scss">
.zigzag {
  position: relative;
    padding: 1.5rem 1rem;
    // background: rgba($primary, 0.2);
    background: $primary;
    color: $white;
    // background: #dddccf;
  &:after {
    background: linear-gradient(-45deg, #fff 4px, transparent 0), linear-gradient(45deg, #fff 4px, transparent 0);
    background-position: left-bottom;
    background-repeat: repeat-x;
    background-size: 6px 6px;
    content: " ";
    display: block;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 6px;
  }

  &:before {
    background: linear-gradient(-45deg, #fff 4px, transparent 0), linear-gradient(45deg, #fff 4px, transparent 0);
    background-position: left-bottom;
    background-repeat: repeat-x;
    background-size: 6px 6px;
    content: " ";
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 6px;
    transform: rotate(180deg);
  }
}

.btn-outline-secondary {
  border-color: $border-color;
  margin-right: -1px;
  border-radius: 0;
}

.buttons {
  display: flex;
  justify-content: stretch;
  margin-bottom: 10px;

  .btn {
    width: 100%;
    border-radius: 0;

    &:first-child {
      border-top-left-radius: $border-radius;
      border-bottom-left-radius: $border-radius;
    }

    &:last-child {
      border-top-right-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }
  }
}
</style>
