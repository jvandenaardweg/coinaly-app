<template>
  <button type="button" class="btn btn-sync btn-sm mr-3" :class="{'is-loading': isLoading }" @click.prevent="handleClick()">
    <svg class="feather feather-refresh-ccw" width="18" height="18" fill="transparent" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use xlink:href="/static/icons/feather-icons/feather-sprite.svg#refresh-ccw"/></svg>
  </button>
</template>

<script>
export default {
  name: 'BtnSync',
  data: () => ({
    isLoading: false,
    isDisabled: false,
    timeout: 10000
  }),
  computed: {
    timeoutSeconds () {
      return (this.timeout / 1000)
    }
  },
  methods: {
    async handleClick () {
      if (!this.isDisabled) {
        this.isLoading = true
        try {
          await Promise.all([
            this.$store.dispatch('balances/getAll', {forceRefresh: true}),
            this.$store.dispatch('orders/getAllOpenOrders', {forceRefresh: true}),
            this.$store.dispatch('orders/getAllClosedOrders', {forceRefresh: true})
          ])
          this.activateTimeout()
        } finally {
          this.isDisabled = true
          this.isLoading = false
        }
      } else {
        // TODO: Temporary, we should handle this more friendly
        window.alert(`Please wait ${this.timeoutSeconds} seconds before syncing your balance and orders again.`)
      }
    },
    activateTimeout () {
      setTimeout(() => {
        this.isDisabled = false
      }, this.timeout)
    }
  }
}
</script>

<style lang="scss">
.btn-sync {
  border: 0;
  background: transparent;
  width: 40px;

  &:focus {
    outline: none;
  }
}

// @keyframes spin { 100% { transform:rotate(360deg); } }
</style>
