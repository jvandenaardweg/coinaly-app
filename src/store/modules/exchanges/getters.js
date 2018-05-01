export default {
  selected (state) {
    return state.selected
  },
  selectedName (state) {
    if (state.available[state.selected]) {
      return state.available[state.selected].name
    } else {
      return null
    }
  }
}
