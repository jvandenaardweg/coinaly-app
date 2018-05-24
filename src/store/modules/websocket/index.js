import state from '@/store/modules/websocket/state'
import mutations from '@/store/modules/websocket/mutations'
import getters from '@/store/modules/websocket/getters'
import actions from '@/store/modules/websocket/actions'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
