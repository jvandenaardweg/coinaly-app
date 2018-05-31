<template>
  <router-link :to="toPath"
    class="list-group-item list-group-item-action symbol-select">

    <div class="d-flex align-items-center">
      <img
      :src="currency.icon_uri"
      :id="`list-group-item-icon-${symbol}`"
      width="18"
      :alt="symbol" />

      <div class="symbol-select-symbol">
        <strong>{{ symbol }}</strong>
        <div class="symbol-select-fullname text-muted"><span :id="`list-group-item-name-${symbol}`">{{ currency.name }}</span></div>
      </div>

    </div>

    <div class="ml-auto text-right">
      <div class="text-muted">
        {{ meta }}
      </div>
      <div v-if="badges" class="badge badge-light" v-for="badge in badges" :key="badge">{{ badge }}</div>
    </div>

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
    },
    badges: {
      type: Array,
      required: false
    }
  },
  computed: {
    toPath () {
      if (this.$route && this.$route.path) return this.$route.path + '/' + this.symbol
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
  &.symbol-select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1.2;

    img {
      margin-right: 10px;

      @include media-breakpoint-up(md) {
        margin-right: 15px;
      }
    }

    .symbol-select-fullname {
      // font-size: rem-calc(14);

      // @include media-breakpoint-up(md) {
      //   font-size: rem-calc(16);
      // }
    }

    .symbol-select-symbol {
      strong {
        display: block;
      }
    }
  }
}
</style>
