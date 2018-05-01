import Vue from 'vue'
import Router from 'vue-router'

import LayoutLogin from '@/layouts/Login'
import LayoutSignup from '@/layouts/Signup'
import LayoutDashboard from '@/layouts/Dashboard'

import PageMarketsIndex from '@/pages/markets/Index'
// import PageMarketsIndex from '@/pages/markets/Index'
import PageMarketsQuote from '@/pages/markets/quote/Index'
import PageMarketsMarket from '@/pages/markets/quote/base/Index'

import PageBalancesIndex from '@/pages/balances/Index'

import PageLoginIndex from '@/pages/login/Index'
import PageLoginForgot from '@/pages/login/forgot/Index'

import PageSignupIndex from '@/pages/signup/Index'

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
      component: LayoutDashboard,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'Balances Index',
          component: PageBalancesIndex,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/buy',
          component: PageBuyIndex,
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: '',
              component: PageBuySelectQuoteCurrency,
              name: 'Buy Quote',
              meta: {
                requiresAuth: true
              }
            },
            {
              path: ':quoteCurrency',
              component: PageBuySelectBaseCurrency,
              name: 'Buy Base',
              meta: {
                requiresAuth: true
              }
            },
            {
              path: ':quoteCurrency/:baseCurrency',
              component: PageBuySelectPricing,
              meta: {
                requiresAuth: true
              },
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
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: '',
              component: PageSellSelectQuoteCurrency,
              name: 'Sell - Balance',
              meta: {
                requiresAuth: true
              }
            },
            {
              path: ':quoteCurrency',
              component: PageSellSelectBaseCurrency,
              name: 'Sell - Market',
              meta: {
                requiresAuth: true
              }
            },
            {
              path: ':quoteCurrency/:baseCurrency',
              component: PageSellSelectPricing,
              beforeEnter: (to, from, next) => {
                console.log('validate selected base currency and quote currency', to.params.baseCurrency, to.params.quoteCurrency, 'Is this pair tradeable? And has this user the quoteCurrency in his balance?')
                next()
              },
              meta: {
                requiresAuth: true
              }
            }
          ]
        },
        {
          path: '/markets',
          component: PageMarketsIndex,
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: '', // Matches: /markets
              component: PageMarketsQuote,
              name: 'Markets Quote',
              meta: {
                requiresAuth: true
              }
            },
            {
              path: ':quote', // Matches: /markets/BTC
              component: PageMarketsQuote,
              name: 'Markets Quote ID',
              meta: {
                requiresAuth: true
              }
            }
          ]
        },
        {
          path: '/markets/:quote/:base', // Matches: /markets/BTC/XRP
          name: 'Market',
          component: PageMarketsMarket,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/settings',
          component: PageSettingsIndex,
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: '',
              component: PageSettingsAccount,
              name: 'Account settings',
              meta: {
                requiresAuth: true,
                slug: 'account'
              }
            },
            {
              path: 'exchanges',
              component: PageSettingsExchanges,
              name: 'Exchange settings',
              meta: {
                requiresAuth: true,
                slug: 'exchanges'
              }
            },
            {
              path: 'exchanges/:edit',
              component: PageSettingsExchangesEdit,
              name: 'Exchange edit',
              meta: {
                requiresAuth: true,
                slug: 'exchanges'
              }
            }
          ]
        }
      ]
    },
    {
      path: '/onboarding',
      name: 'Onboarding',
      component: PageOnboardingIndex
    },
    {
      path: '/login',
      component: LayoutLogin,
      children: [
        {
          path: '',
          name: 'Login',
          component: PageLoginIndex
        },
        {
          path: '/login/forgot',
          name: 'Forgot Password',
          component: PageLoginForgot
        }
      ]
    },
    {
      path: '/signup',
      component: LayoutSignup,
      children: [
        {
          path: '',
          name: 'Signup',
          component: PageSignupIndex
        }
      ]
    }
  ]
})
