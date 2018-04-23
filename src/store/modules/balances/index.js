import actions from '@/store/modules/balances/actions'
import getters from '@/store/modules/balances/getters'
import mutations from '@/store/modules/balances/mutations'
import state from '@/store/modules/balances/state'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
