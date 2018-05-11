<template>
  <!-- <div class="mt-5 text-center" > -->
    <!-- <p class="text-muted">Exchange status: Healthy</p> -->
    <!-- <p class="text-muted">Websocket Status: {{ websocketState }}</p> -->
    <!-- <p class="text-muted">Your status: {{ userStatus }}</p> -->
  <div class="alert alert-danger fixed-bottom m-0" v-if="friendlyMessage">{{ friendlyMessage }}</div>
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
    },
    friendlyMessage () {
      if (this.userStatus === 'Offline') return 'You are offline. No internet connection available.'
      if (this.websocketsError.code === 4007 || this.websocketsError.code === 1009) return 'Cannot establish a stable connection. Are you online?'
      return null
    }
  }
}
</script>
