<template>
  <div class="container">
    <router-link to="/buy" class="btn btn-primary">Buy</router-link>
    <router-link to="/sell" class="btn btn-primary">Sell</router-link>

    <div class="row justify-content-center">
      <div class="col-md-6">
        <orders-timeline :orders="ordersOpen" context="open"></orders-timeline>

      </div>
      <div class="col-md-6">
        <orders-timeline :orders="ordersClosed" context="closed"></orders-timeline>
      </div>
    </div>

    <div class="alert alert-danger" v-if="localError">
      {{ localError }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OrdersTimeline from '@/components/OrdersTimeline'
import Search from '@/components/Search'

export default {
  name: 'PageOrdersIndex',
  components: {
    OrdersTimeline,
    Search
  },
  data: () => ({
    isCancelling: false,
    localError: null
  }),
  beforeMount () {
    if (this.selectedExchange !== 'binance') {
      this.dispatchGetAllClosedOrders()
      this.dispatchGetAllOpenOrders()
    }
  },
  computed: {
    ...mapGetters({
      selectedExchange: 'exchanges/selected',
      ordersOpen: 'orders/open',
      ordersClosed: 'orders/closed',
      allFilledBalances: 'balances/allFilledBalances'
    }),
    message () {
      if (this.selectedExchange === 'binance') {
        return 'This page does not yet work for Binance'
      }
    }
  },
  methods: {
    dispatchGetAllClosedOrders (payload) {
      return this.$store.dispatch('orders/getAllClosedOrders', payload)
    },
    dispatchGetAllOpenOrders (payload) {
      return this.$store.dispatch('orders/getAllOpenOrders', payload)
    }
  }
}
</script>
