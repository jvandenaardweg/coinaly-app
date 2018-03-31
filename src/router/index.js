import Vue from 'vue'
import Router from 'vue-router'
import PageSell from '@/pages/Sell'
import PageBuy from '@/pages/Buy'
import PageHome from '@/pages/Home'
import PageMarkets from '@/pages/Markets'
import PageBalances from '@/pages/Balances'
import PageExchanges from '@/pages/Exchanges'

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
      name: 'Sell',
      component: PageSell
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
