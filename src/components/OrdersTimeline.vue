<template>
  <div class="timeline">
    <loader v-if="isLoading"></loader>

    <card-partial-empty v-if="!isLoading" :text="emptyText"></card-partial-empty>

    <div class="timeline-items">
       <div
        v-if="!isLoading"
        @click.prevent="isOpen = order.id"
        class="timeline-item"
        v-for="order in orders"
        :key="order.id"
        :class="{'is-buy': order.side === 'buy', 'is-sell': order.side === 'sell' }">

        <div>
          <div class="timeline-date">{{ order.datetime | readableDate }} ({{ timeDistance(order.datetime) }})</div>

          <div class="timeline-header">
            <img :src="symbol(order.symbol).icon_uri" width="18" />
            <img :src="symbol(quoteId(order.symbol)).icon_uri" width="18" />
            <span class="timeline-symbol" v-html="title(order)"></span>

            <div class="ml-auto d-flex" v-if="context === 'open'">
              <button type="button" class="btn btn-sm btn-danger" :class="{'is-loading': orderIsCancelling(order.id)}" :disabled="orderIsCancelling(order.id)" @click.prevent="handleClickCancel(order.id)">Cancel</button>
            </div>
          </div>

          <div class="timeline-subheader">
            <div class="progress">
              <div class="progress-bar" role="progressbar" :style="{'width': `${percentageFilled(order)}%`}" :class="{'bg-success': percentageFilled(order) === 100, 'bg-warning': percentageFilled(order) < 100}" :aria-valuenow="percentageFilled(order)" aria-valuemin="0" aria-valuemax="100"></div>
            </div>

            <span class="badge badge-warning" v-if="order.remaining && percentageFilled(order)" :style="{'left': `calc(${percentageFilled(order)}% - 58px)`}">{{ percentageFilled(order) | percentage }}</span>
            <span class="badge badge-success" v-if="!order.remaining && percentageFilled(order)" :style="{'left': `calc(${percentageFilled(order)}% - 58px)`}">{{ percentageFilled(order) | percentage }}</span>
            <span class="badge badge-dark" v-if="percentageFilled(order) === 0" :style="{'left': `0`}">{{ percentageFilled(order) | percentage }}</span>
          </div>

          <table class="table" v-if="isOpen === order.id">
            <tbody>
              <tr>
                <th scope="col">Price ({{ quoteId(order.symbol) }})</th>
                <th scope="col">Amount ({{ baseId(order.symbol) }})</th>
                <th scope="col">Cost ({{ quoteId(order.symbol) }})</th>
              </tr>
              <tr>
                <td>{{ order.price }}</td>
                <td>{{ order.amount }}</td>
                <td>{{ order.cost }}</td>
              </tr>
              <tr>
                <th scope="col">Fee paid ({{ quoteId(order.symbol) }})</th>
                <th scope="col">Remaining ({{ order.fee.currency }})</th>
                <th scope="col">Market</th>
              </tr>
              <tr>
                <td>{{ order.fee.cost }}</td>
                <td>{{ order.remaining }}</td>
                <td>{{ order.symbol }}</td>
              </tr>
            </tbody>
          </table>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '@/components/Loader'
import PercentageBadge from '@/components/PercentageBadge'
import CardPartialEmpty from '@/components/card/PartialEmpty'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

export default {
  name: 'OrdersTimeline',
  components: {
    PercentageBadge,
    Loader,
    CardPartialEmpty
  },
  props: {
    orders: {
      type: Array,
      required: true
    },
    context: {
      type: String,
      required: true
    }
  },
  data: () => ({
    isCancelling: null,
    localError: null,
    isOpen: null
  }),
  computed: {
    ...mapGetters({
      symbols: 'symbols/symbols',
      isLoadingOrders: 'orders/isLoading',
      isLoadingTickers: 'tickers/isLoading'
    }),
    isLoading () {
      return !this.orders.length && (this.isLoadingOrders || this.isLoadingTickers)
    },
    hasOrders () {
      return (this.orders.length > 0) && !this.isLoading
    },
    emptyText () {
      if (!this.hasOrders) return `You don't have any ${this.context} orders...`
      return null
    }
  },
  methods: {
    percentageFilled (order) {
      if (!order.remaining) return 100
      if (order.remaining === order.amount) return 0
      return Math.abs(((order.filled - order.amount) / order.amount) * 100)
    },
    baseId (marketSymbol) {
      return marketSymbol.split('/')[0]
    },
    quoteId (marketSymbol) {
      return marketSymbol.split('/')[1]
    },
    symbol (marketSymbol) {
      if (this.symbols) {
        const baseId = this.baseId(marketSymbol)
        return this.symbols[baseId]
      } else {
        return {}
      }
    },
    title (order) {
      let readableSide
      let correctAmount

      if (order.status === 'closed') {
        correctAmount = order.filled

        if (order.side === 'sell') {
          readableSide = 'Sold'
        } else {
          readableSide = 'Bought'
        }
      } else {
        correctAmount = order.amount

        if (order.side === 'sell') {
          readableSide = 'Selling'
        } else {
          readableSide = 'Buying'
        }
      }

      return `<strong>${readableSide} ${correctAmount} ${this.baseId(order.symbol)} for ${this.quoteId(order.symbol)}</strong>`
    },
    orderIsCancelling (orderUuid) {
      return this.isCancelling === orderUuid
    },
    async handleClickCancel (orderUuid) {
      this.isCancelling = orderUuid
      try {
        const result = await this.$store.dispatch('orders/cancelOrder', orderUuid)
        // Bittrex seems to still have orders in cache right after deleting them
        // This 2000ms timeout seems to do the trick (for now). It's ugly, might want to try for a better fix on this
        await this.sleep(2000)

        // Get the open orders again, so we can update the local store
        await this.dispatchGetAllOpenOrders({
          forceRefresh: true
        })
        return result
      } catch (err) {
        this.localError = err
      } finally {
        this.isCancelling = false
      }
    },
    sleep (ms = 0) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    dispatchGetAllOpenOrders ({ forceRefresh }) {
      const payload = {
        forceRefresh
      }
      return this.$store.dispatch('orders/getAllOpenOrders', payload)
    },
    timeDistance (date) {
      return distanceInWordsToNow(
        new Date(date)
      ) + ' ago'
    }
  }
}
</script>

<style lang="scss">
.timeline {
  margin-top: 4rem;
  position: relative;

  .progress {
    height: 4px;
    margin-bottom: -16px;
    margin-top: 5px;
  }

  .timeline-items {
    // padding: 0 0 0 1rem;
    // border-left: 2px $border-color solid;
  }

  .timeline-subheader {
    // text-align: center;
    // margin-bottom: 1rem;
    height: 10px;

    .badge {
      position: relative;
      width: 58px;
    }
  }

  .timeline-header {
    display: flex;
    // margin-bottom: 0.5rem;
    // border-bottom: 1px $border-color solid;
    padding-bottom: 0.5rem;

    @include media-breakpoint-up(md) {
      // padding-bottom: 1rem;
      // margin-bottom: 1rem;
    }

    img {
      justify-content: center;
      align-self: center;
      margin-right: 10px;
    }
  }

  .timeline-item {
    position: relative;

    &:before {
      content: "";
      width: 1rem;
      height: 1rem;
      background: $white;
      border: 3px $border-color solid;
      border-radius: 100%;
      position: absolute;
      left: 23px;
      top: -33px;
      margin: auto;
      z-index: 2;
    }

    &:after {
      content: "";
      width: 2px;
      height: calc(100% + 70px);
      background: $border-color;
      position: absolute;
      left: 30px;
      top: -30px;
      z-index: 0;
    }

    > div {
      background-color: $white;
      // background: $gray-100;
      padding: 0.75rem;
      border-radius: $border-radius;
      border: 1px $border-color solid;
      position: relative;
      margin-bottom: 4rem;
      display: block;
      color: inherit;
      z-index: 1;
      cursor: pointer;
      // transition: background-color 250ms;

      @include media-breakpoint-up(md) {
        padding: 1rem;
      }

      &:before {
        content: "";
        background: red;
        width: 40px;
        height: 40px;
        position: absolute;
        right: 0;
        top: 0;
      }

      &:hover {
        @include media-breakpoint-up(md) {
          // background-color: $gray-100;
        }
      }
    }

    .timeline-date {
      position: absolute;
      top: -2.5rem;
      left: 50px;
      color: $gray-600;
    }
  }

  .timeline-footer {
    text-align: center;
  }
}

.table {
  width: 100%;
  line-height: 1.2;
  margin-top: 10px;

  th,td {
    width: 33.333333%;
  }

  th {
    text-transform: uppercase;
    font-size: 0.85rem;
    font-weight: 700;
  }

  td {
    color: $gray-600;
  }

  tr {
    &:nth-child(1n) td {
      padding-bottom: 15px;
    }
    &:last-child {
      td {
        padding-bottom: 0;
      }
    }
  }
}
</style>
