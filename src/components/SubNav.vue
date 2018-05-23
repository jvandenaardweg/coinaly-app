<template>
  <nav class="subnav">
    <div class="subnav-group">
      <router-link class="subnav-group-item" :to="item.uri" v-for="item in items" :key="item.slug" exact>
        <span class="subnav-group-button">{{ item.label }}</span>
      </router-link>
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

<style lang="scss">
.subnav {
  background-color: $white;

  a {
    font-weight: 600;
    &:hover {
      text-decoration: none;
    }
  }

  .subnav-group {
    display: inline-flex;
    width: 100%;
  }

  .subnav-group-item {
    flex-grow: 1;
    position: relative;

    & + & {
      margin-left: -1px;
    }

    &:not(:first-child) .subnav-group-button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &:not(:last-child) .subnav-group-button {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    &.active {
      border-color: $primary;
      z-index: 1;
      color: $primary;
      background: mix(#fff, $primary, 90%);

      .subnav-group-button {
        border-color: $primary;
        z-index: 2;
        color: $primary;
      }
    }
  }

  .subnav-group-input {
    opacity: 0;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
  }

  .subnav-group-button {
    display: block;
    border: 1px solid $input-border-color;
    text-align: center;
    padding: $input-btn-padding-y 1rem;
    position: relative;
    cursor: pointer;
    border-radius: 3px;
    color: $text-muted;
    user-select: none;
    font-size: $font-size-base;
    line-height: $input-btn-line-height;
    min-width: $input-height;
  }

  .subnav-group-button-icon {
    padding-left: .5rem;
    padding-right: .5rem;
    font-size: 1.125rem;
    line-height: 1.125rem;
  }

  .subnav-group-pills {
    flex-wrap: wrap;
    align-items: flex-start;

    .subnav-group-item {
      margin-right: .5rem;
      flex-grow: 0;
    }

    .subnav-group-button {
      border-radius: 50px !important;
    }
  }
}
</style>
