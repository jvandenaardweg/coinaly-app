<template>
  <div class="card">

    <CardLoading :isLoading="isLoading" :text="'Loading Balances...'"></CardLoading>

    <ListRadioCurrency
      v-if="!isLoading"
      :currencies="balances"
      :activeCurrency="currency"
      @selectedCurrency="handleSelectedCurrency">
    </ListRadioCurrency>

    <div class="card-footer">
      <router-link class="btn btn-primary btn-block" :to="`/${routeBase}/${currency}`" :class="{'disabled': !currency}" :disabed="!currency">{{ nextStepAction }}</router-link>
    </div>

  </div>
</template>

<script>
import CardLoading from '@/components/CardLoading'
import ListRadioCurrency from '@/components/ListRadioCurrency'

export default {
  name: 'SelectBalance',
  props: ['balances', 'activeCurrency', 'nextStepAction', 'routeBase', 'isLoading'],
  components: {
    CardLoading,
    ListRadioCurrency
  },
  data () {
    return {
      currency: this.activeCurrency || null
    }
  },
  computed: {
    hasBalances () {
      return Object.keys(this.balances).length
    }
  },
  methods: {
    handleSelectedCurrency (symbol) {
      this.currency = symbol
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
