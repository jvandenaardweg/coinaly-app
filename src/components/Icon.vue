<template>
  <svg :class="`icon feather feather-${name}`" width="18" height="18" :fill="fill" :stroke="stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <use :xlink:href="`/static/icons/feather-icons/feather-sprite.svg#${name}`"/>
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    },
    stroke: {
      type: String,
      required: false,
      default: '#000000'
    },
    fill: {
      type: String,
      required: false,
      default: 'transparent'
    }
  }
}
</script>
