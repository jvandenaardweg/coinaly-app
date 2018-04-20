<template>
  <button type="button" class="btn-favorite">
    <Icon name="star" :stroke="strokeColor" :fill="fillColor"></Icon>
  </button>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  name: 'BtnFavorite',
  components: {
    Icon
  },
  props: {
    active: Boolean,
    fill: String,
    stroke: String
  },
  computed: {
    fillColor () {
      if (this.active) return '#ffb53f'
      return this.fill || '#ccc'
    },
    strokeColor () {
      if (this.active) return '#ffb53f'
      return this.stroke || '#ccc'
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-favorite {
  padding: 0;
  height: 30px;
  line-height: 30px;
  border: 0;
  background: none;
  cursor: pointer;

  &:hover {
    svg {
      fill: #000;
      stroke: #000;
    }
  }

  svg {
    vertical-align: text-top;
    transition: 250ms all;
  }
}
</style>
