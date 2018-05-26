<template>
  <div class="input-large">
    <input type="text" class="input-large" :name="name" :placeholder="placeholder" />
    <div class="input-large-help">{{ label }}</div>
  </div>
</template>

<script>
export default {
  name: 'InputLarge',
  props: {
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.input-large {
  width: 100%;

  input {
    font-size: 24px;
    color: $primary;
    font-weight: $font-weight-bold;
    border: 0;
    border-bottom: 1px $border-color solid;
    background: 0;
    padding: 0;
    width: 100%;
    text-align: center;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: $gray-500;
      font-weight: normal;
      font-size: 1rem;
    }
  }

  .input-large-help {
    font-weight: normal;
    display: block;
    text-align: center;
    color: $gray-500;
  }

}
</style>
