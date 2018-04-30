import Vue from 'vue'
import Vuex from 'vuex'

import CurrenciesStore from '@/store/modules/currencies'
import BalancesStore from '@/store/modules/balances'
import MarketsStore from '@/store/modules/markets'
import ExchangesStore from '@/store/modules/exchanges'
import OrdersStore from '@/store/modules/orders'
import WebsocketsStore from '@/store/modules/websockets'
import AuthStore from '@/store/modules/auth'
import UserStore from '@/store/modules/user'
import TickersStore from '@/store/modules/tickers'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    currencies: CurrenciesStore,
    balances: BalancesStore,
    markets: MarketsStore,
    exchanges: ExchangesStore,
    orders: OrdersStore,
    websockets: WebsocketsStore,
    auth: AuthStore,
    user: UserStore,
    tickers: TickersStore
  }
})
