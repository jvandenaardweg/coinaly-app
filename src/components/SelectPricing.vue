<template>
  <div class="card">
    <form name="order" @submit.prevent="handleSubmit($event)">
      <div class="card-body">
        <!-- {{ activeMarket }} -->
        <div class="form-row">
          <div class="form-group col-6">
            <label for="inputEmail4"><strong>Sell</strong></label>
            <div class="input-group">
              <input type="text" class="form-control" :value="quoteCurrency" disabled>
              <div class="input-group-append">
                <router-link :to="`/${routeBase}`" class="btn btn-light">Change</router-link>
              </div>
            </div>
          </div>
          <div class="form-group col-6">
            <label for="inputEmail4"><strong>For</strong></label>
            <div class="input-group">
              <input type="text" class="form-control" :value="baseCurrency" disabled>
              <div class="input-group-append">
                <router-link :to="`/${routeBase}/${quoteCurrency}`" class="btn btn-light">Change</router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="alert alert-primary text-center"> -->
          <p class="text-success text-center">You have <strong>{{ amountFreeInBalance | number }} {{ quoteCurrency }}</strong> available to sell</p>
        <!-- </div> -->

         <div class="form-group">
          <label for=""><strong>Limit or market order?</strong></label>
          <select class="form-control">
            <option>Default select</option>
          </select>
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

        <div class="zigzag">
          <ul class="list-unstyled">
            <li class="d-flex">
              <span class="font-weight-bold">Total {{ quoteCurrency }}:</span>
              <span class="ml-auto">{{ amount | number }} {{ quoteCurrency }}</span>
            </li>
            <li class="d-flex pt-2">
              <span class="font-weight-bold">Price per {{ quoteCurrency }}:</span>
              <span class="ml-auto"> {{ price }} {{ baseCurrency }}</span>
            </li>
            <li class="d-flex pt-2 pb-2">
              <span class="font-weight-bold">Exchange fee:</span>
              <span class="ml-auto">{{ totalFee | toFixed }} {{ baseCurrency }}</span>
            </li>
            <li class="d-flex border-top pt-2">
              <span class="font-weight-bold">You get:</span>
              <span class="ml-auto">{{ totalPrice | toFixed }} {{ baseCurrency }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="card-footer">
        <button type="submit" class="btn btn-success btn-lg btn-block" :class="{'disabled': disableSubmitButton}" :disabed="disableSubmitButton">Sell {{ quoteCurrency }} for {{ baseCurrency }}</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SelectPricing',
  props: ['activeMarket', 'activeBalance', 'quoteCurrency', 'baseCurrency', 'marketSymbol', 'routeBase'],
  data () {
    return {
      price: null, // TODO: automatically convert "," to ".",
      amount: null,
      exchangeFees: {
        bittrex: 0.0025 // 0.25%
      }
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
    },
    totalPrice () {
      return (this.price * this.amount) + ((this.price * this.amount) * this.exchangeFees['bittrex'])
    },
    totalFee () {
      return (this.price * this.amount) * this.exchangeFees['bittrex']
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
        this.exchangeFee = amount * this.exchangeFees['bittrex']
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
    },
    handleSubmit () {
      console.log('Send this', 'amount', this.amount, 'price', this.price, 'market', this.marketSymbol)
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
</style>
