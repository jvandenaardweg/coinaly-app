<template>
  <div class="exchange-status" v-if="hasMessage">
    <div class="alert alert-danger" v-if="dangerMessage">{{ dangerMessage }}</div>
    <div class="alert alert-warning" v-if="warningMessage && !dangerMessage"><strong>Warning:</strong> {{ warningMessage }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ExchangeStatus',
  computed: {
    ...mapGetters({
      websocketsError: 'websocket/error',
      websocketIsDelayed: 'websocket/isDelayed',
      websocketDelayTimeout: 'websocket/delayTimeout',
      userIsOnline: 'user/isOnline',
      selectedExchange: 'exchanges/selected'
    }),
    userStatus () {
      if (this.userIsOnline) return 'Online'
      return 'Offline'
    },
    dangerMessage () {
      if (this.userStatus === 'Offline') return 'You are offline. No internet connection available.'
      if (this.websocketsError.code === 4007 || this.websocketsError.code === 1009) return 'Cannot establish a stable connection. Are you online?'
      return null
    },
    warningMessage () {
      if (this.websocketIsDelayed) return `New market data for ${this.selectedExchange} is delayed more than ${this.websocketDelayTimeout / 1000} seconds.`
      return null
    },
    hasMessage () {
      return this.dangerMessage || this.warningMessage
    }
  }
}
</script>

<style lang="scss">
.exchange-status {
  position: fixed;
  bottom: 3.5rem;
  width: 100%;
  text-align: center;

  .alert {
    margin-bottom: 0;
    border-radius: 0;
  }

  @include media-breakpoint-up(md) {
    bottom: 0;
  }
}
</style>
