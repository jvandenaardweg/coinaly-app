import Vue from 'vue'
import Vuex from 'vuex'

import CurrenciesStore from '@/store/modules/currencies'
import BalancesStore from '@/store/modules/balances'
import MarketsStore from '@/store/modules/markets'
import ExchangesStore from '@/store/modules/exchanges'
import KeysStore from '@/store/modules/keys'
import OrdersStore from '@/store/modules/orders'
import PricesStore from '@/store/modules/prices'
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
    keys: KeysStore,
    orders: OrdersStore,
    prices: PricesStore,
    websockets: WebsocketsStore,
    auth: AuthStore,
    user: UserStore,
    tickers: TickersStore
  }
})
