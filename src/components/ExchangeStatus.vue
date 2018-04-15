<template>
  <div class="mt-5 text-center">
    <p class="text-muted">Exchange status: Healthy</p>
    <p class="text-muted">{{ websocketsError }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ExchangeStatus',
  computed: {
    ...mapGetters({
      websocketsError: 'websockets/error'
    })
  }
}
</script>
