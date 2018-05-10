<template>
  <transition :name="transitionName">
    <router-view :class="{'view-slide': transitionName}"></router-view>
  </transition>
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

      console.log(this.transitionName)
      // this.transitionName = (toDepth > fromDepth) ? 'slide-left' : 'slide-right'
      // const toDepth = to.meta.depth || 0;
      // const fromDepth = from.meta.depth || 0;

      // this.transitionName = toDepth >= fromDepth ? 'slide-left' : 'slide-right';
    }
  }
}
</script>

<style lang="scss">
.view-slide {
  transition: opacity 350ms cubic-bezier(.55,0,.1,1), transform 350ms cubic-bezier(.55,0,.1,1);
  position: absolute;
  //     width: 100%;
  //   top: 150px;
  //   left: 0;
  //   right: 0;
}
.slide-left-enter, .slide-right-leave-to {
  opacity: 0;
  transform: translate(30px, 0);
}
.slide-left-leave-to, .slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}
</style>
