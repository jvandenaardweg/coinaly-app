<template>
  <div class="orders-timeline">
    <div v-if="isLoading">Loading orders...</div>

    <router-link
      v-if="!isLoading"
      :to="`orders/${order.id}`"
      class="orders-timeline-item"
      v-for="order in closedOrders"
      :key="order.id"
      :class="{'is-buy': order.side === 'buy', 'is-sell': order.side === 'sell' }">
      <div class="d-flex">
        <strong>{{ order.symbol }}</strong>
        <div class="ml-auto d-flex">
          <span>$ 100.20</span>
        <!-- <span class="text-muted ml-auto">Cost: {{ order.cost }} {{ order.symbol.split('/')[1] }}</span> -->
        <percentage-badge :percentage="5" class="ml-2"></percentage-badge>
        </div>

      </div>
      <div>
        <div class="text-muted">{{ order.side }}: {{ order.amount }} {{ order.symbol.split('/')[0] }}</div>
        <div class="text-muted">cost: {{ order.cost }} {{ order.symbol.split('/')[1] }}</div>
        <!-- <div class="badge badge-light">{{ order.side }}</div> -->
      </div>
    </router-link>

    <div class="orders-timeline-footer">
      <button type="button" class="btn btn-primary">Show more</button>
    </div>


    <!-- <li class="orders-timeline-item">
      <strong>BTC/USDT</strong>
    </li>
    <li class="orders-timeline-item">
      <strong>BTC/USDT</strong>
    </li>
    <li class="orders-timeline-item">
      <strong>BTC/USDT</strong>
    </li>
    <li class="orders-timeline-item">
      <strong>BTC/USDT</strong>
    </li>
    <li class="orders-timeline-item">
      <strong>BTC/USDT</strong>
    </li> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PercentageBadge from '@/components/PercentageBadge'

export default {
  name: 'OrdersTimeline',
  components: {
    PercentageBadge
  },
  created () {
    this.$store.dispatch('orders/getAllClosedOrders', 'bittrex')
  },
  computed: {
    ...mapGetters({
      isLoadingOrders: 'orders/isLoading',
      isLoadingTickers: 'tickers/isLoading',
      closedOrders: 'orders/closed'
    }),
    isLoading () {
      return this.isLoadingOrders || this.isLoadingTickers
    }
  }
}
</script>

<style lang="scss">
.orders-timeline {
  border-left: 2px $border-color solid;
  padding: 0 0 0 1rem;
  margin-top: 2rem;
}
.orders-timeline-item {
  background-color: $white;
  padding: 1rem;
  border-radius: $border-radius;
  border: 1px $border-color solid;
  position: relative;
  margin-bottom: 1rem;
  display: block;
  color: inherit;

  &:hover {
    text-decoration: none;
    background-color: $gray-100;
  }
  // display: flex;

  // &.is-buy {
  //   border-right: 5px $success solid;
  // }

  // &.is-sell {
  //   border-right: 5px $danger solid;
  // }

  &:before {
    content: "";
    width: 1rem;
    height: 1rem;
    background: $white;
    border: 3px $border-color solid;
    border-radius: 100%;
    position: absolute;
    left: -1.6rem;
    top: 1.4rem;
    margin: auto;
  }
}

.orders-timeline-footer {
  text-align: center;
}
</style>
