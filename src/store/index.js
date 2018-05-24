import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate' // Persist state for our PWA (so on reloads we persist state)

import BalancesStore from '@/store/modules/balances'
import DepositsStore from '@/store/modules/deposits'
import MarketsStore from '@/store/modules/markets'
import ExchangesStore from '@/store/modules/exchanges'
import KeysStore from '@/store/modules/keys'
import OrdersStore from '@/store/modules/orders'
import PricesStore from '@/store/modules/prices'
import SymbolsStore from '@/store/modules/symbols'
import WebsocketStore from '@/store/modules/websocket'
import AuthStore from '@/store/modules/auth'
import UserStore from '@/store/modules/user'
import TickersStore from '@/store/modules/tickers'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    balances: BalancesStore,
    deposits: DepositsStore,
    markets: MarketsStore,
    exchanges: ExchangesStore,
    keys: KeysStore,
    orders: OrdersStore,
    prices: PricesStore,
    symbols: SymbolsStore,
    auth: AuthStore,
    user: UserStore,
    websocket: WebsocketStore,
    tickers: TickersStore
  },
  plugins: [createPersistedState()]
})
