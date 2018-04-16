<template>
  <nav class="subnav">
    <div class="form-group m-0">
      <div class="selectgroup w-100">
        <router-link :to="item.uri" class="selectgroup-item" v-for="item in items" :key="item.slug">
          <input type="radio" name="value" value="50" class="selectgroup-input" :checked="selected === item.slug">
          <span class="selectgroup-button">{{ item.label }}</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'SubNav',
  props: ['items', 'selected'],
  // Using empty data fixes some weird Jest coverage issues
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/bootstrap/setting";
@import "~bootstrap/scss/mixins/breakpoints";

.subnav {
  background-color: $white;

  a {
    font-weight: 600;
    &:hover {
      text-decoration: none;
    }
  }
}

</style>
