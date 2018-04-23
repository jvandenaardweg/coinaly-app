import Vue from 'vue'
import Vuex from 'vuex'

import SymbolsStore from '@/store/modules/symbols'
import BalancesStore from '@/store/modules/balances'
import MarketsStore from '@/store/modules/markets'
import ExchangesStore from '@/store/modules/exchanges'
import OrdersStore from '@/store/modules/orders'
import WebsocketsStore from '@/store/modules/websockets'
import AuthorizationStore from '@/store/modules/authorization'
import UserStore from '@/store/modules/user'
import TickersStore from '@/store/modules/tickers'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    symbols: SymbolsStore,
    balances: BalancesStore,
    markets: MarketsStore,
    exchanges: ExchangesStore,
    orders: OrdersStore,
    websockets: WebsocketsStore,
    authorization: AuthorizationStore,
    user: UserStore,
    tickers: TickersStore
  }
})
