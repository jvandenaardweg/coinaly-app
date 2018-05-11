<template>
  <button type="button" @click.prevent="handleClick" class="btn btn-dark-blue btn-back">
    <svg class="feather feather-chevron-left" width="25" height="25" fill="transparent" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <use xlink:href="/static/icons/feather-icons/feather-sprite.svg#chevron-left"/>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'BtnBack',
  methods: {
    handleClick () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.btn {
  &.btn-back {
    padding:0;
    width:40px;
    height:40px;
    position: relative;

    &:hover {
      svg {
        transform: translateX(-3px);
      }
    }

    svg {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      transition: 250ms all;
    }
  }
}
</style>
