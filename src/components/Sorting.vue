<template>
  <ul class="sorting">
    <li><button type="button" @click.prevent="handleClick('symbol')">Symbol</button></li>
    <li class="ml-auto"><button type="button" @click.prevent="handleClick('price')">Price (USD)</button></li>
  </ul>
</template>

<script>
export default {
  name: 'Sorting',
  methods: {
    handleClick (sort) {
      this.$emit('sort', sort)
    }
  }
}
</script>

<style lang="scss">

.sorting {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  width: 100%;
  margin-top: 0.4rem;
  margin-bottom: -4px;

  @include media-breakpoint-up(md) {
    margin-top: 0.5rem;
    margin-bottom: -7px;
  }

  li {
    display: inline-block;

    &.is-active {
      &:after {
        transform: rotate(180deg);
      }
    }

    button {
      background: none;
      padding: 0;
      margin: 0;
      border: 0;
      text-transform: uppercase;
      font-size: 0.85rem;
      font-weight: 700;
      color: $gray-500;
      cursor: pointer;
      transition: color 250ms;

      &:hover {
        color: $primary;
      }

      &:after {
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: 0.255em;
        vertical-align: 0.255em;
        content: "";
        border-top: 0.3em solid;
        border-right: 0.3em solid transparent;
        border-bottom: 0;
        border-left: 0.3em solid transparent;
      }
    }
  }
}
</style>
