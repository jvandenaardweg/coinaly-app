<template>
  <button
    type="button"
    class="btn btn-select btn-dark-blue btn-sm btn-square-sm"
    :class="{'is-loading': isLoading }"
    @click.prevent="handleClick()">
    <svg class="feather feather-refresh-ccw" width="18" height="18" fill="transparent" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use xlink:href="/static/icons/feather-icons/feather-sprite.svg#refresh-ccw"/></svg>
  </button>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BtnSync',
  data: () => ({
    isLoading: false,
    isDisabled: false,
    timeout: 10000,
    lastSynced: new Date(),
    syncInterval: 5 * 60 * 1000 // 5 minutes
  }),
  computed: {
    ...mapGetters({
      selectedExchange: 'exchanges/selected'
    }),
    timeoutSeconds () {
      return (this.timeout / 1000)
    },
    lastSyncDifference () {
      return this.lastSynced.getTime() - new Date().getTime()
    }
  },
  mounted () {
    // Sync user data every X minutes automatically when the user has the website open
    setInterval(() => {
      // Check if the user has not already synced himself
      // If not, we auto sync
      const currentTimestamp = new Date().getTime()
      const lastSyncedTimestamp = this.lastSynced.getTime()
      const shouldSync = (currentTimestamp - lastSyncedTimestamp) > this.syncInterval

      if (shouldSync) {
        this.isDisabled = false // So the auto-sync does not show an alert to the user
        this.handleClick()
      }
    }, this.syncInterval)
  },
  methods: {
    async handleClick () {
      if (!this.isDisabled) {
        this.isLoading = true
        try {
          await this.forceRefreshUserData()
          this.activateTimeout()
          this.lastSynced = new Date()
        } finally {
          this.isDisabled = true
          this.isLoading = false
        }
      } else {
        // TODO: Temporary, we should handle this more friendly
        this.showAlert()
      }
    },
    activateTimeout () {
      setTimeout(() => {
        this.isDisabled = false
      }, this.timeout)
    },
    showAlert () {
      window.alert(`Please wait ${this.timeoutSeconds} seconds before syncing your balance and orders again.`)
    },
    forceRefreshUserData () {
      if (this.selectedExchange === 'binance') {
        return Promise.all([
          this.$store.dispatch('balances/getAll', {forceRefresh: true})
        ])
      } else {
        return Promise.all([
          this.$store.dispatch('balances/getAll', {forceRefresh: true}),
          this.$store.dispatch('orders/getAllOpenOrders', {forceRefresh: true}),
          this.$store.dispatch('orders/getAllClosedOrders', {forceRefresh: true})
        ])
      }
    }
  }
}
</script>

<style lang="scss">
// .btn-sync {
//   border: 0;
//   background: transparent;
//   width: 40px;

//   &:focus {
//     outline: none;
//   }
// }

// @keyframes spin { 100% { transform:rotate(360deg); } }
</style>
