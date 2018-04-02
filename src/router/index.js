import Vue from 'vue'
import Router from 'vue-router'
// import PageSell from '@/pages/Sell'
import PageBuy from '@/pages/Buy'
import PageHome from '@/pages/Home'
import PageMarkets from '@/pages/Markets'
import PageBalances from '@/pages/Balances'
import PageExchanges from '@/pages/Exchanges'

import PageSellIndex from '@/pages/sell/Index.vue'
import PageSellSelectQuoteCurrency from '@/pages/sell/SelectQuoteCurrency.vue'
import PageSellSelectBaseCurrency from '@/pages/sell/SelectBaseCurrency.vue'
import PageSellSelectPricing from '@/pages/sell/SelectPricing.vue'

// import store from '../store'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: PageHome
    },
    {
      path: '/buy',
      name: 'Buy',
      component: PageBuy
    },
    {
      path: '/sell',
      component: PageSellIndex,
      children: [
        {
          path: '',
          component: PageSellSelectQuoteCurrency
        },
        {
          path: ':quoteCurrency',
          component: PageSellSelectBaseCurrency
        },
        {
          path: ':quoteCurrency/:baseCurrency',
          component: PageSellSelectPricing,
          beforeEnter: (to, from, next) => {
            console.log('validate selected base currency and quote currency', to.params.baseCurrency, to.params.quoteCurrency, 'Is this pair tradeable? And has this user the quoteCurrency in his balance?')
            next()
          }
        }
      ]
    },
    {
      path: '/markets',
      name: 'Markets',
      component: PageMarkets
    },
    {
      path: '/balances',
      name: 'Balances',
      component: PageBalances
    },
    {
      path: '/exchanges',
      name: 'Exchanges',
      component: PageExchanges
    }
  ]
})
