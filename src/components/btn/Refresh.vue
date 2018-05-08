<template>
  <button type="button" class="btn btn-refresh btn-sm mr-3" @click.prevent="refreshBalances()">
    <svg class="feather feather-refresh-ccw" width="18" height="18" fill="transparent" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use xlink:href="/static/icons/feather-icons/feather-sprite.svg#refresh-ccw"/></svg>
  </button>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BtnRefresh',
  computed: {
    ...mapGetters({
      isLoading: 'balances/isLoading'
    }),
    refreshLabel () {
      if (this.isLoading) {
        return 'Getting Balances...'
      } else {
        return 'Refresh Balances'
      }
    }
  },
  methods: {
    refreshBalances () {
      this.$store.dispatch('balances/getAll', {forceRefresh: true})
    }
  }
}
</script>

<style lang="scss">
.btn-refresh {
  border: 0;
  background: transparent;
  width: 40px;
}
</style>
