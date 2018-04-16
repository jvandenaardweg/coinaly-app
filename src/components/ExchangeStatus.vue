<template>
  <div class="mt-5 text-center">
    <!-- <p class="text-muted">Exchange status: Healthy</p> -->
    <p class="text-muted">Websocket Status: {{ websocketState }}</p>
    <p class="text-muted">Your status: {{ userStatus }}</p>
    <p class="text-muted">{{ websocketsError }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ExchangeStatus',
  computed: {
    ...mapGetters({
      websocketsError: 'websockets/error',
      websocketState: 'websockets/state',
      userIsOnline: 'user/isOnline'
    }),
    userStatus () {
      if (this.userIsOnline) return 'Online'
      return 'Offline'
    }
  }
}
</script>
