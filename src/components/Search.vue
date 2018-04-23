<template>
  <div class="input-icon mt-3">
    <span class="input-icon-addon">
      <i class="fe fe-user"></i>
    </span>
    <input type="text" class="form-control" :placeholder="placeholderLabel" v-model="searchQuery" @keyup="handleSearch">
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    placeholder: String
  },
  data () {
    return {
      searchQuery: null
    }
  },
  computed: {
    placeholderLabel () {
      return (this.placeholder) ? this.placeholder : 'Search...'
    }
  },
  methods: {
    handleSearch (event) {
      this.$emit('search', this.searchQuery)
    }
  }
}
</script>