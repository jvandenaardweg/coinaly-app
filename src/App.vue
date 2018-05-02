<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="scss">
html, body {
  height: 100%;
}

#app {
  height: 100%;
}

.page {
  padding-top: 5rem;

  @include media-breakpoint-up(sm) {
    padding-top: 5rem;
  }

  @include media-breakpoint-up(md) {
    padding-top: 9rem;
  }
}

html {
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  text-size-adjust: 100%;
}

.navbar {
  border-bottom: 1px $border-color solid;
}

.btn,
label {
  font-weight: 600;
}

label {
  margin-bottom: 0.3rem;
}

.view {
  // max-width: 800px;
  // margin: 0 auto;
  position: relative;
  height: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: all 100ms ease
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}

</style>
