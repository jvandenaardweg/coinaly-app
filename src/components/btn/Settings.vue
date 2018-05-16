<template>
  <router-link to="/settings" class="btn btn-select btn-dark-blue btn-sm btn-square-sm">
    <Icon name="settings" stroke="#ffffff"></Icon>
  </router-link>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  name: 'BtnSettings',
  components: {
    Icon
  }
}
</script>
