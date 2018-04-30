
import actions from '@/store/modules/auth/actions'
import getters from '@/store/modules/auth/getters'
import mutations from '@/store/modules/auth/mutations'
import state from '@/store/modules/auth/state'

// TODO: set authenticated on page load (cookie?)

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
