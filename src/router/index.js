import Vue from 'vue'
import Router from 'vue-router'
// import PageSell from '@/pages/Sell'
// import PageBuy from '@/pages/Buy'
import PageHome from '@/pages/Home'
import PageMarkets from '@/pages/Markets'
import PageBalances from '@/pages/Balances'
import PageExchanges from '@/pages/Exchanges'

import PageBuyIndex from '@/pages/buy/Index.vue'
import PageBuySelectQuoteCurrency from '@/pages/buy/SelectQuoteCurrency.vue'
import PageBuySelectBaseCurrency from '@/pages/buy/SelectBaseCurrency.vue'
import PageBuySelectPricing from '@/pages/buy/SelectPricing.vue'

import PageSellIndex from '@/pages/sell/Index.vue'
import PageSellSelectQuoteCurrency from '@/pages/sell/SelectQuoteCurrency.vue'
import PageSellSelectBaseCurrency from '@/pages/sell/SelectBaseCurrency.vue'
import PageSellSelectPricing from '@/pages/sell/SelectPricing.vue'

// import store from '../store'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: PageHome
    },
    {
      path: '/buy',
      component: PageBuyIndex,
      children: [
        {
          path: '',
          component: PageBuySelectQuoteCurrency
        },
        {
          path: ':quoteCurrency',
          component: PageBuySelectBaseCurrency
        },
        {
          path: ':quoteCurrency/:baseCurrency',
          component: PageBuySelectPricing,
          beforeEnter: (to, from, next) => {
            console.log('validate selected base currency and quote currency', to.params.baseCurrency, to.params.quoteCurrency, 'Is this pair tradeable? And has this user the quoteCurrency in his balance?')
            next()
          }
        }
      ]
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
