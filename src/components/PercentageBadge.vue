<template>
  <div class="percentage-badge" :class="colorClass">
    {{ percentage | percentage}}
  </div>
</template>

<script>
export default {
  name: 'PercentageBadge',
  props: {
    percentage: Number,
    required: true
  },
  computed: {
    colorClass () {
      if (this.percentage > 0) {
        return 'bg-success'
      } else if (this.percentage === 0) {
        return 'bg-light'
      } else {
        return 'bg-danger'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.percentage-badge {
  border-radius: 3px;
  padding: 0.4rem 0;
  color: #fff;
  font-weight: 600;
  width: 4rem;
  text-align: center;

  &.bg-light {
    color: rgba(#000000, 0.5);
  }
}
</style>
