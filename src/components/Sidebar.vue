<template>
  <nav class="sidebar">
    <div class="sidebar-sticky">
      <ul class="list-unstyled">
        <li><a href="#" class="btn">Balances</a></li>
        <li><a href="#" class="btn">Buy</a></li>
        <li><a href="#" class="btn">Sell</a></li>
        <li><a href="#" class="btn">Markets</a></li>
        <li><a href="#" class="btn">Settings</a></li>
      </ul>
      <!-- items -->
      <!-- <img src="~feather-icons/dist/icons/home.svg" /> -->
      <svg class="feather feather-home"
        width="20"
        height="20"
        fill="transparent"
        stroke="#000"
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
@import "../scss/bootstrap/setting";

.sidebar {
  width: 70px;
  z-index: 100;
  padding-top: 4rem;
  background: $white;
}
</style>
