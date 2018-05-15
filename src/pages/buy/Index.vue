<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {
  name: 'PageBuy',
  data: () => ({
    transitionName: 'slide-left'
  }),
  watch: {
    $route (to, from) {
      const toDepth = to.fullPath.split('/').length
      const fromDepth = from.fullPath.split('/').length

      if (toDepth > fromDepth) {
        this.transitionName = 'slide-left'
      } else if (toDepth < fromDepth) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = null
      }
    }
  }
}
</script>

<style lang="scss">
//
</style>
