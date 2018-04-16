import Vue from 'vue'
import Vuex from 'vuex'

import SymbolsStore from './modules/symbols'
import BalancesStore from './modules/balances'
import MarketsStore from './modules/markets'
import ExchangesStore from './modules/exchanges'
import OrdersStore from './modules/orders'
import DepositsStore from './modules/deposits'
import WithdrawalsStore from './modules/withdrawals'
import WebsocketsStore from './modules/websockets'
import AuthorizationStore from './modules/authorization'
import UserStore from './modules/user'
import TickersStore from './modules/tickers'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    symbols: SymbolsStore,
    balances: BalancesStore,
    markets: MarketsStore,
    exchanges: ExchangesStore,
    orders: OrdersStore,
    deposits: DepositsStore,
    withdrawals: WithdrawalsStore,
    websockets: WebsocketsStore,
    authorization: AuthorizationStore,
    user: UserStore,
    tickers: TickersStore
  }
})
