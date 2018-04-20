import Vue from 'vue'
import Router from 'vue-router'

import PageMarketsIndex from '@/pages/markets/Index'
// import PageMarketsIndex from '@/pages/markets/Index'
import PageMarketsQuote from '@/pages/markets/quote/Index'
import PageMarketsMarket from '@/pages/markets/quote/base/Index'

import PageBalancesIndex from '@/pages/balances/Index'

import PageSettingsIndex from '@/pages/settings/Index'
import PageSettingsAccount from '@/pages/settings/account/Index'
import PageSettingsExchanges from '@/pages/settings/exchanges/Index'
import PageSettingsExchangesEdit from '@/pages/settings/exchanges/Edit'

import PageBuyIndex from '@/pages/buy/Index.vue'
import PageBuySelectQuoteCurrency from '@/pages/buy/SelectQuoteCurrency.vue'
import PageBuySelectBaseCurrency from '@/pages/buy/SelectBaseCurrency.vue'
import PageBuySelectPricing from '@/pages/buy/SelectPricing.vue'

import PageSellIndex from '@/pages/sell/Index.vue'
import PageSellSelectQuoteCurrency from '@/pages/sell/SelectQuoteCurrency.vue'
import PageSellSelectBaseCurrency from '@/pages/sell/SelectBaseCurrency.vue'
import PageSellSelectPricing from '@/pages/sell/SelectPricing.vue'

import PageOnboardingIndex from '@/pages/onboarding/Index.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  // scrollBehavior (to, from, savedPosition) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (savedPosition) {
  //         resolve(savedPosition)
  //       } else {
  //         resolve({ x: 0, y: 0 })
  //       }
  //     }, 100)
  //   })
  // },
  mode: 'history',
  fallback: false,
  routes: [
    {
      path: '/',
      name: 'Balances',
      component: PageBalancesIndex
    },
    {
      path: '/buy',
      component: PageBuyIndex,
      children: [
        {
          path: '',
          component: PageBuySelectQuoteCurrency,
          name: 'Quote'
        },
        {
          path: ':quoteCurrency',
          component: PageBuySelectBaseCurrency,
          name: 'Base'
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
          component: PageSellSelectQuoteCurrency,
          name: 'Sell - Balance'
        },
        {
          path: ':quoteCurrency',
          component: PageSellSelectBaseCurrency,
          name: 'Sell - Market'
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
      component: PageMarketsIndex,
      children: [
        {
          path: '', // Matches: /markets
          component: PageMarketsQuote,
          name: 'Quote ID'
        },
        {
          path: ':quoteId', // Matches: /markets/BTC
          component: PageMarketsQuote,
          name: 'Quote ID'
        }
      ]
    },
    {
      path: '/markets/:quoteId/:baseId', // Matches: /markets/BTC/XRP
      name: 'Market',
      component: PageMarketsMarket
    },
    {
      path: '/settings',
      component: PageSettingsIndex,
      children: [
        {
          path: '',
          component: PageSettingsAccount,
          name: 'Account settings',
          meta: {
            slug: 'account'
          }
        },
        {
          path: 'exchanges',
          component: PageSettingsExchanges,
          name: 'Exchange settings',
          meta: {
            slug: 'exchanges'
          }
        },
        {
          path: 'exchanges/:edit',
          component: PageSettingsExchangesEdit,
          name: 'Exchange edit',
          meta: {
            slug: 'exchanges'
          }
        }
      ]
    },
    {
      path: '/onboarding',
      name: 'Onboarding',
      component: PageOnboardingIndex
    }
  ]
})
