<template>
  <nav class="bg-dark sidebar">
    <div class="sidebar-sticky">
      items
      <!-- <img src="~feather-icons/dist/icons/home.svg" /> -->
      <svg class="feather feather-home"
        width="24"
        height="24"
        fill="transparent"
        stroke="#fff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <use xlink:href="static/icons/feather-icons/feather-sprite.svg#home"/>
      </svg>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Sidebar',
  // Using empty data fixes some weird Jest coverage issues
  data () {
    return {}
  }
}
</script>

<style lang="scss">
.sidebar {
  width: 100px;
  z-index: 1030;
}
</style>
