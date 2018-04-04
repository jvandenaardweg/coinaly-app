<template>
  <div class="card">

    <CardLoading :isLoading="isLoading" :text="'Loading Balances...'"></CardLoading>

    <CardEmpty :isEmpty="isEmpty" :text="'No currencies available in your balance.'"></CardEmpty>

    <ListGroupSelectCurrencies
      v-if="showListGroup"
      :currencies="allFilledCurrencies"
      :activeCurrency="currency"
      @selectedCurrency="handleSelectedCurrency">
    </ListGroupSelectCurrencies>

    <div class="card-footer">
      <router-link class="btn btn-primary btn-block" :to="routeUrl" :class="{'disabled': !currency}" :disabed="!currency">{{ nextStepAction }}</router-link>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardLoading from '@/components/card/CardPartialLoading'
import CardEmpty from '@/components/card/CardPartialEmpty'
import ListGroupSelectCurrencies from '@/components/list-group/ListGroupSelectCurrencies'

export default {
  name: 'CardSelectBalance',
  props: ['activeCurrency', 'nextStepAction', 'routeBase'],
  components: {
    CardLoading,
    CardEmpty,
    ListGroupSelectCurrencies
  },
  data () {
    return {
      currency: this.activeCurrency || null
    }
  },
  computed: {
    ...mapGetters({
      allFilledCurrencies: 'balances/allFilledCurrencies',
      hasCurrencies: 'balances/hasCurrencies',
      isLoading: 'balances/isLoading',
      isEmpty: 'balances/isEmpty'
    }),
    showListGroup () {
      return !this.isLoading && !this.isEmpty
    },
    routeUrl () {
      return `/${this.routeBase}/${this.currency}`
    }
  },
  methods: {
    handleSelectedCurrency (symbol) {
      this.currency = symbol
    }
  }
}
</script>
