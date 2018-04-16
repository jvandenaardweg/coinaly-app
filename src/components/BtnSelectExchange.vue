<template>
  <div class="dropdown">
    <button @click="show = !show" class="btn btn-dark-blue btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{ selectedName }}
    </button>
    <div class="dropdown-menu dropdown-menu-right" :class="{'show': show }" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" @click.prevent="handleSwitch('binance')" v-show="selected !== 'binance'">Switch to: <strong>Binance</strong></a>
      <a class="dropdown-item" @click.prevent="handleSwitch('bittrex')" v-show="selected !== 'bittrex'">Switch to: <strong>Bittrex</strong></a>
      <div class="dropdown-divider"></div>
      <router-link to="/settings/exchanges" class="dropdown-item" @click.native="show = false">Exchange settings</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BtnSelectExchange',
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters({
      selected: 'exchanges/selected',
      selectedName: 'exchanges/selectedName'
    })
  },
  methods: {
    handleSwitch (exchangeSlug) {
      this.$store.commit('exchanges/setSelected', exchangeSlug)
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  // background: #22467B;
  // border-color: #22467B;
  outline: none;
}

.dropdown-item {
  cursor: pointer;
}
</style>
