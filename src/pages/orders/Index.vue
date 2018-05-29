<template>
  <div class="container">
    <p>show open orders and order history (if possible)</p>
    <h2>Open</h2>
     <div v-for="(order, index) in ordersOpen" :key="index">
      {{ order.timestamp }} {{ order.side }} {{ order.symbol }} {{ order.id }} {{ order.price }}
    </div>
    <h2>Closed</h2>
    <div v-for="(order, index) in ordersClosed" :key="index">
      {{ order.timestamp }} {{ order.side }} {{ order.symbol }} {{ order.id }} {{ order.price }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageOrdersIndex',
  created () {
    this.$store.dispatch('orders/getAllClosedOrders')
  },
  computed: {
    ...mapGetters({
      ordersOpen: 'orders/open',
      ordersClosed: 'orders/closed'
    })
  }
}
</script>
