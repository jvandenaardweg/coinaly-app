<template>
  <div class="horizontal-scroller">
    <div class="horizontal-scroller-container">
      <div class="horizontal-scroller-item">
        <div class="card">
          <div class="card-body">High performing trade</div>
        </div>
      </div>
      <div class="horizontal-scroller-item">
        <div class="card">
          <div class="card-body">High performing trade</div>
        </div>
      </div>
      <div class="horizontal-scroller-item">
        <div class="card">
          <div class="card-body">High performing trade</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorizontalScroller'
}
</script>

<style lang="scss" scoped>
@import "../scss/bootstrap/setting";
@import "~bootstrap/scss/mixins/breakpoints";

.horizontal-scroller {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  margin-left: -0.75rem;
  margin-right:-0.75rem;

  @include media-breakpoint-up(md) {
    white-space: inherit;
    margin-left: inherit;
    margin-right: inherit;
  }

  .horizontal-scroller-container {
    overflow-x: auto;
  }

  .horizontal-scroller-item {
    display: inline-block;

    @include media-breakpoint-up(md) {
      display: block;
      margin-bottom: 0.5rem;
    }

  }
}

</style>
