<template>
  <div class="layout-page">
    <nav-bar></nav-bar>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <router-view></router-view>
          <support-chat></support-chat>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SupportChat from '@/components/SupportChat'
import NavBar from '@/components/NavBar'

export default {
  name: 'LayoutPage',
  components: {
    NavBar,
    SupportChat
  }
}
</script>

<style lang="scss">
.layout-page {
  padding-top: 5rem;
}
</style>
