<template>
  <div id="app">
    <NavBar></NavBar>
    <div class="page mt-9">
      <div class="page-main">
        <div class="page-content">
          <div class="container">
            <router-view></router-view>
            {{ websocketsError }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Sidebar from './components/Sidebar.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    NavBar,
    Sidebar
  },
  created () {
    this.$store.dispatch('websockets/connect', 'bittrex')
  },
  computed: {
    ...mapGetters({
      websocketsError: 'websockets/error'
    })
  }
}
</script>

<style lang="scss">
@import "./scss/bootstrap/setting";
@import "~bootstrap/scss/bootstrap";

// Customizing bootstrap standard components a little bit
@import "./scss/bootstrap/components/dropdown";
@import "./scss/bootstrap/components/card";
@import "./scss/bootstrap/components/select-group";

html {
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  text-size-adjust: 100%;
}

.navbar {
  border-bottom: 1px $border-color solid;
}

.btn {
  font-weight: 600;
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
