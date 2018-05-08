<template>
  <div id="balances">
    <div class="row">
      <div class="col-md-6">
        <div class="card card-100-xs bg-blue h-100" style="margin-top:-1.30rem;">
          <div class="card-body text-center">
            <h1 class="h1 text-white mb-1 font-weight-bold">&euro; 12.035,51</h1>
            <h2 class="h5 text-light font-weight-normal">2.41231 BTC</h2>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <HorizontalScroller></HorizontalScroller>
      </div>
    </div>



    <div class="row justify-content-center">
      <div class="col">
        <div class="card mt-4">
          <div class="list-group list-group-flush">
            <router-link :to="`balances/${symbol}`" class="list-group-item" v-for="(meta, symbol, index) in allFilledCurrencies" :key="symbol">
              <img :src="iconLocation" width="18" />
              <strong>{{ symbol }}</strong>
              <span>{{ meta.total }}</span>
              <percentage-badge :percentage="10"></percentage-badge>
            </router-link>
          </div>
        </div>
<!--
        <div class="card">
          <div class="card-body">body</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HorizontalScroller from '@/components/HorizontalScroller'
import PercentageBadge from '@/components/PercentageBadge'

export default {
  name: 'PageBalances',
  components: {
    HorizontalScroller,
    PercentageBadge
  },
  // mounted () {
  //   this.$store.dispatch('balances/getAll')
  // },
  computed: {
    ...mapGetters({
      allFilledCurrencies: 'balances/allFilledCurrencies',
      currency: 'currencies/currency'
    }),
    iconLocation () {
      if (this.currency) {
        return this.currency.iconLocation
      } else {
        return null
      }
    }
  }
}
</script>
