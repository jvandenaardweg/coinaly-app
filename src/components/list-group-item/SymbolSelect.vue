<template>
  <router-link :to="toPath"
    class="list-group-item list-group-item-action list-group-item-symbol-select">

    <div>
      <img
      :src="currency.icon_uri"
      :id="`list-group-item-icon-${symbol}`"
      width="18"
      class="mr-1"
      :alt="symbol" />

      <strong>{{ symbol }}</strong>

      <span class="text-muted font-weight-normal">(<span :id="`list-group-item-name-${symbol}`">{{ currency.name }}</span>)</span>

    </div>

    <span class="ml-auto text-muted">
      <span>
        {{ meta }}
      </span>
    </span>

    <icon name="chevron-right"></icon>
  </router-link>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  name: 'ListGroupItemSymbolSelect',
  components: {
    Icon
  },
  data: () => ({
    selected: null
  }),
  props: {
    currency: {
      type: Object,
      required: false
    },
    symbol: {
      type: String,
      required: true
    },
    meta: {
      type: String,
      required: false
    }
  },
  computed: {
    toPath () {
      if (this.$route.path) return this.$route.path + '/' + this.symbol
      return null
    }
  },
  watch: {
    selected (newValue, oldValue) {
      this.$emit('selected', newValue)
    }
  }
}
</script>

<style lang="scss">
.list-group-item {
  &.list-group-item-symbol-select {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
