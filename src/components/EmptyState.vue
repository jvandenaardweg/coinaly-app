<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="empty-state text-center">
        <h1 class="h2">{{ title }}</h1>
        <p class="font-weight-normal text-muted">{{ content }}</p>
        <router-link v-if="action" :to="link" class="btn btn-primary btn-lg mt-5">{{ action }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: ['title', 'content', 'action', 'link']
}
</script>
