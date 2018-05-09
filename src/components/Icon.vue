<template>
  <svg :class="`icon feather feather-${name}`" width="18" height="18" :fill="fillColor" :stroke="strokeColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <use :xlink:href="`/static/icons/feather-icons/feather-sprite.svg#${name}`"/>
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: ['name', 'stroke', 'fill'],
  computed: {
    strokeColor () {
      return this.stroke || '#000000'
    },
    fillColor () {
      return this.fill || 'transparent'
    }
  }
}
</script>
