<template>
  <div class="card" @keyup.enter="handleEnter">

    <CardLoading :isLoading="isLoading" :text="'Loading Balances...'"></CardLoading>

    <CardEmpty :isEmpty="!isLoading && !hasBalances" :text="'No currencies available in your balance.'"></CardEmpty>

    <ListRadioCurrencies
      v-if="!isLoading"
      :currencies="balances"
      :activeCurrency="currency"
      @selectedCurrency="handleSelectedCurrency">
    </ListRadioCurrencies>

    <div class="card-footer">
      <router-link class="btn btn-primary btn-block" :to="routeUrl" :class="{'disabled': !currency}" :disabed="!currency">{{ nextStepAction }}</router-link>
    </div>

  </div>
</template>

<script>
import CardLoading from '@/components/card/partials/CardLoading'
import CardEmpty from '@/components/card/partials/CardEmpty'
import ListRadioCurrencies from '@/components/list-group/ListGroupSelectCurrencies'

export default {
  name: 'CardSelectBalance',
  props: ['balances', 'activeCurrency', 'nextStepAction', 'isLoading', 'routeBase'],
  components: {
    CardLoading,
    CardEmpty,
    ListRadioCurrencies
  },
  data () {
    return {
      currency: this.activeCurrency || null
    }
  },
  computed: {
    hasBalances () {
      if (!this.balances) return false
      return Object.keys(this.balances).length > 0
    },
    routeUrl () {
      return `/${this.routeBase}/${this.currency}`
    }
  },
  methods: {
    handleSelectedCurrency (symbol) {
      this.currency = symbol
    },
    handleEnter () {
      if (this.currency) this.$router.push(this.routeUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-group-item,
label {
  cursor: pointer;
}
</style>
