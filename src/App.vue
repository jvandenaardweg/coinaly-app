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
@import "./scss/bootstrap/setting";
@import "~bootstrap/scss/bootstrap";

// Customizing bootstrap standard components a little bit
@import "./scss/bootstrap/components/dropdown";
@import "./scss/bootstrap/components/card";
@import "./scss/bootstrap/components/select-group";
@import "./scss/bootstrap/components/list-group";

html, body {
  height: 100%;
}

#app {
  // padding-bottom: 5rem;
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

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
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
