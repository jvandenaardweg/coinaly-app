<template>
  <div id="app">
    <NavBar></NavBar>

    <div class="page mt-9">
      <div class="page-main">
        <div class="page-content">
          <div class="container-fluid" style="padding-left: 120px">
            <Sidebar></Sidebar>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'app',
  components: {
    NavBar,
    Sidebar
  }
}
</script>

<style lang="scss">
@import "./scss/bootstrap/setting";
@import "~bootstrap/scss/bootstrap";

.navbar {
  border-bottom: 1px $border-color solid;
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

</style>
