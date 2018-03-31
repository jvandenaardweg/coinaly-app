import Vue from 'vue'
import Vuex from 'vuex'

import SymbolsStore from './modules/symbols'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    symbols: SymbolsStore
  }
})
