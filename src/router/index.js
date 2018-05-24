import Vue from 'vue'
import Router from 'vue-router'

// Use Webpack's code splitting, so signup users don't get the whole bundle
// And loggedin users don't get authentication code, which they dont need anymore
const LayoutFocus = () => import(/* webpackChunkName: "LayoutFocus" */ '@/layouts/Focus')
const LayoutDashboard = () => import(/* webpackChunkName: "LayoutDashboard" */ '@/layouts/Dashboard')
const LayoutPage = () => import(/* webpackChunkName: "LayoutPage" */ '@/layouts/Page')

// import LayoutFocus from '@/layouts/Focus'
// import LayoutDashboard from '@/layouts/Dashboard'
// import LayoutPage from '@/layouts/Page'

const PageMarketsIndex = () => import(/* webpackChunkName: "PageMarketsIndex" */ '@/pages/markets/Index')
const PageMarketsQuote = () => import(/* webpackChunkName: "PageMarketsQuote" */ '@/pages/markets/quote/Index')
const PageMarketsMarket = () => import(/* webpackChunkName: "PageMarketsMarket" */ '@/pages/markets/quote/base/Index')

// import PageMarketsIndex from '@/pages/markets/Index'
// import PageMarketsQuote from '@/pages/markets/quote/Index'
// import PageMarketsMarket from '@/pages/markets/quote/base/Index'

// import PageBalancesIndex from '@/pages/balances/Index'
// import PageBalancesHome from '@/pages/balances/Home'
// import PageBalancesSymbol from '@/pages/balances/Symbol'

const PageBalancesIndex = () => import(/* webpackChunkName: "PageBalancesIndex" */ '@/pages/balances/Index')
const PageBalancesHome = () => import(/* webpackChunkName: "PageBalancesHome" */ '@/pages/balances/Home')
const PageBalancesSymbol = () => import(/* webpackChunkName: "PageBalancesSymbol" */ '@/pages/balances/Symbol')

// import PageWalletsIndex from '@/pages/wallets/Index'

const PageWalletsIndex = () => import(/* webpackChunkName: "PageWalletsIndex" */ '@/pages/wallets/Index')

// import PageLoginIndex from '@/pages/login/Index'
// import PageLoginForgot from '@/pages/login/forgot/Index'
// import PageLoginForgotReset from '@/pages/login/forgot/Reset'

const PageLoginIndex = () => import(/* webpackChunkName: "PageLoginIndex" */ '@/pages/login/Index')
const PageLoginForgot = () => import(/* webpackChunkName: "PageLoginForgot" */ '@/pages/login/forgot/Index')
const PageLoginForgotReset = () => import(/* webpackChunkName: "PageLoginForgotReset" */ '@/pages/login/forgot/Reset')

// import PageSignupIndex from '@/pages/signup/Index'
// import PageSignupSuccessIndex from '@/pages/signup/success/Index'
// import PageSignupVerifyIndex from '@/pages/signup/verify/Index'

const PageSignupIndex = () => import(/* webpackChunkName: "PageSignupIndex" */ '@/pages/signup/Index')
const PageSignupSuccessIndex = () => import(/* webpackChunkName: "PageSignupSuccessIndex" */ '@/pages/signup/success/Index')
const PageSignupVerifyIndex = () => import(/* webpackChunkName: "PageSignupVerifyIndex" */ '@/pages/signup/verify/Index')

// import PageSettingsIndex from '@/pages/settings/Index'
// import PageSettingsAccount from '@/pages/settings/account/Index'
// import PageSettingsExchanges from '@/pages/settings/exchanges/Index'
// import PageSettingsExchangesEdit from '@/pages/settings/exchanges/Edit'
// import PageSettingsExchangesAdd from '@/pages/settings/exchanges/Add'

const PageSettingsIndex = () => import(/* webpackChunkName: "PageSettingsIndex" */ '@/pages/settings/Index')
const PageSettingsAccount = () => import(/* webpackChunkName: "PageSettingsAccount" */ '@/pages/settings/account/Index')
const PageSettingsExchanges = () => import(/* webpackChunkName: "PageSettingsExchanges" */ '@/pages/settings/exchanges/Index')
const PageSettingsExchangesEdit = () => import(/* webpackChunkName: "PageSettingsExchangesEdit" */ '@/pages/settings/exchanges/Edit')
const PageSettingsExchangesAdd = () => import(/* webpackChunkName: "PageSettingsExchangesAdd" */ '@/pages/settings/exchanges/Add')

// import PageBuyIndex from '@/pages/buy/Index.vue'
// import PageBuySelectQuote from '@/pages/buy/SelectQuote.vue'
// import PageBuySelectBase from '@/pages/buy/SelectBase.vue'
// import PageBuySelectPricing from '@/pages/buy/SelectPricing.vue'

const PageBuyIndex = () => import(/* webpackChunkName: "PageBuyIndex" */ '@/pages/buy/Index.vue')
const PageBuySelectQuote = () => import(/* webpackChunkName: "PageBuySelectQuote" */ '@/pages/buy/SelectQuote.vue')
const PageBuySelectBase = () => import(/* webpackChunkName: "PageBuySelectBase" */ '@/pages/buy/SelectBase.vue')
const PageBuySelectPricing = () => import(/* webpackChunkName: "PageBuySelectPricing" */ '@/pages/buy/SelectPricing.vue')

// import PageSellIndex from '@/pages/sell/Index.vue'
// import PageSellSelectBase from '@/pages/sell/SelectBase.vue'
// import PageSellSelectQuote from '@/pages/sell/SelectQuote.vue'
// import PageSellSelectPricing from '@/pages/sell/SelectPricing.vue'

const PageSellIndex = () => import(/* webpackChunkName: "PageSellIndex" */ '@/pages/sell/Index.vue')
const PageSellSelectBase = () => import(/* webpackChunkName: "PageSellSelectBase" */ '@/pages/sell/SelectBase.vue')
const PageSellSelectQuote = () => import(/* webpackChunkName: "PageSellSelectQuote" */ '@/pages/sell/SelectQuote.vue')
const PageSellSelectPricing = () => import(/* webpackChunkName: "PageSellSelectPricing" */ '@/pages/sell/SelectPricing.vue')

// import PageOnboardingIndex from '@/pages/onboarding/Index.vue'

const PageOnboardingIndex = () => import(/* webpackChunkName: "PageOnboardingIndex" */ '@/pages/onboarding/Index.vue')

// import PagePrivacyIndex from '@/pages/privacy/Index.vue'

const PagePrivacyIndex = () => import(/* webpackChunkName: "PagePrivacyIndex" */ '@/pages/privacy/Index.vue')

// import PageTermsOfUse from '@/pages/terms-of-use/Index.vue'

const PageTermsOfUse = () => import(/* webpackChunkName: "PageTermsOfUse" */ '@/pages/terms-of-use/Index.vue')

// import PageNotFound from '@/pages/not-found/Index.vue'

const PageNotFound = () => import(/* webpackChunkName: "PageNotFound" */ '@/pages/not-found/Index.vue')



Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      if (savedPosition) {
        resolve(savedPosition)
      } else {
        resolve({ x: 0, y: 0 })
      }
      // }, 350) // page transition speed
    })
  },
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
          redirect: '/balances'
        },
        {
          path: '/balances',
          // name: 'Balances Index',
          component: PageBalancesIndex,
          children: [
            {
              path: '',
              name: '',
              component: PageBalancesHome
            },
            {
              path: ':symbol',
              name: 'Balance',
              component: PageBalancesSymbol
            }
          ]
        },
        {
          path: '/buy',
          component: PageBuyIndex,
          children: [
            {
              path: '',
              component: PageBuySelectBase,
              name: 'Select market (base)'
            },
            {
              path: ':baseId',
              component: PageBuySelectQuote,
              name: 'Select balance (quote)'
            },
            {
              path: ':baseId/:quoteId',
              component: PageBuySelectPricing,
              name: 'Create order'
            }
          ]
        },
        {
          path: '/sell',
          component: PageSellIndex,
          children: [
            {
              path: '',
              component: PageSellSelectBase,
              name: 'Select balance (base)'
            },
            {
              path: ':baseId',
              component: PageSellSelectQuote,
              name: 'Select market (quote)'
            },
            {
              path: ':baseId/:quoteId',
              component: PageSellSelectPricing,
              name: 'Create order'
            }
          ]
        },
        {
          path: '/markets',
          component: PageMarketsIndex,
          children: [
            {
              path: '', // Matches: /markets
              component: PageMarketsQuote,
              name: 'Markets Quote'
            },
            {
              path: ':quote', // Matches: /markets/BTC
              component: PageMarketsQuote,
              name: 'Markets Quote ID'
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
              path: 'exchanges/edit/:exchangeSlug',
              component: PageSettingsExchangesEdit,
              name: 'Exchange edit',
              meta: {
                slug: 'exchanges'
              }
            },
            {
              path: 'exchanges/add',
              component: PageSettingsExchangesAdd,
              name: 'Exchange add',
              meta: {
                slug: 'exchanges'
              }
            }
          ]
        },
        {
          path: '/wallets',
          name: 'Wallets',
          component: PageWalletsIndex
        }
      ]
    },
    {
      path: '/onboarding',
      component: LayoutFocus,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'Onboarding',
          component: PageOnboardingIndex
        }
      ]
    },
    {
      path: '/privacy-policy',
      component: LayoutPage,
      meta: {
        requiresAuth: false
      },
      children: [
        {
          path: '',
          name: 'Privacy',
          component: PagePrivacyIndex
        }
      ]
    },
    {
      path: '/terms-of-use',
      component: LayoutPage,
      meta: {
        requiresAuth: false
      },
      children: [
        {
          path: '',
          name: 'Terms of Use',
          component: PageTermsOfUse
        }
      ]
    },
    {
      path: '/login',
      component: LayoutFocus,
      meta: {
        requiresAuth: false
      },
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
        },
        {
          path: '/login/forgot/:resetToken',
          name: 'Forgot Password Reset',
          component: PageLoginForgotReset
        }
      ]
    },
    {
      path: '/signup',
      component: LayoutFocus,
      meta: {
        requiresAuth: false
      },
      children: [
        {
          path: '',
          name: 'Signup',
          component: PageSignupIndex
        },
        {
          path: '/signup/success',
          name: 'Signup Success',
          component: PageSignupSuccessIndex
        },
        {
          path: '/signup/verify/:verificationToken',
          name: 'Signup Verify',
          component: PageSignupVerifyIndex
        }
      ]
    },
    {
      path: '*',
      component: LayoutPage,
      children: [
        {
          path: '',
          name: 'Not Found',
          component: PageNotFound
        }
      ]
    }
  ]
})
