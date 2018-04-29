import getters from '@/store/modules/currencies/getters'
import state from '@/store/modules/currencies/state'
import mutations from '@/store/modules/currencies/mutations'
import actions from '@/store/modules/currencies/actions'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
