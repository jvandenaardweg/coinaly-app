<template>
  <div class="input-icon">
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
    placeholder: {
      type: String,
      required: false
    }
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
