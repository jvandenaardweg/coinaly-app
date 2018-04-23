export default {
  selected (state) {
    return state.selected
  },
  selectedName (state) {
    return state.available[state.selected].name
  }
}
