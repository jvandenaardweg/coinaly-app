<template>
  <div class="container">
    <p>show open orders and order history (if possible)</p>
    <h2>Open</h2>
     <div v-for="(order, index) in ordersOpen" :key="order.id">
      {{ order.timestamp }} {{ order.side }} {{ order.symbol }} {{ order.id }} {{ order.price }}
      <button type="button" class="btn btn-danger" :class="{'is-loading': isCancelling === order.id }" @click.prevent="handleClickDelete(order.id)">Delete</button>
    </div>
    <h2>Closed</h2>
    <div v-for="(order, index) in ordersClosed" :key="order.id">
      {{ order.timestamp }} {{ order.side }} {{ order.symbol }} {{ order.id }} {{ order.price }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageOrdersIndex',
  data: () => ({
    isCancelling: false
  }),
  created () {
    this.dispatchGetAllClosedOrders()
    this.dispatchGetAllOpenOrders()
  },
  computed: {
    ...mapGetters({
      ordersOpen: 'orders/open',
      ordersClosed: 'orders/closed'
    })
  },
  methods: {
    async handleClickDelete (orderUuid) {
      this.isCancelling = orderUuid
      try {
        const result = await this.$store.dispatch('orders/cancelOrder', orderUuid)
        await this.dispatchGetAllOpenOrders(true)
        return result
      } catch (err) {
        console.log('Error cancelling order', err)
      } finally {
        this.isCancelling = false
      }
    },
    dispatchGetAllClosedOrders (forceRefresh) {
      const payload = (forceRefresh) ? {forceRefresh: true} : null
      return this.$store.dispatch('orders/getAllClosedOrders', payload)
    },
    dispatchGetAllOpenOrders (forceRefresh) {
      const payload = (forceRefresh) ? {forceRefresh: true} : null
      return this.$store.dispatch('orders/getAllOpenOrders', payload)
    }
  }
}
</script>
