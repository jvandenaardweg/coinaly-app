<template>
  <transition name="fade" mode="out-in">
    <keep-alive>
      <router-view class="view"></router-view>
    </keep-alive>
  </transition>
</template>

<script>
export default {
  name: 'PageSell'
}
</script>
