<template>
  <button type="button" class="btn btn-primary btn-control">{{ label }}</button>
</template>

<script>
export default {
  name: 'BtnControl',
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.btn {
  &.btn-control {
    padding-top: 0;
    padding-bottom: 0;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 1.5rem;
    font-weight: $font-weight-bold;
    text-align: center;
  }
}
</style>
