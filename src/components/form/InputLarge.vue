<template>
  <div class="form-control-bold">
    <input type="text" class="form-control"
      :id="`inputLarge-${name}`"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      :min="min"
      autocomplete="off"
      @validate="$emit('validate', $event.target.value)"
      @input="$emit('input', returnNumber($event.target.value))" />

    <label class="form-control-bold-label" :for="`inputLarge-${name}`">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'InputLarge',
  $_veeValidate: {
    validator: 'new'
  },
  props: {
    value: {
      type: [String, Number],
      required: false
    },
    min: {
      type: Number,
      required: false
    },
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
  },
  methods: {
    returnNumber (value) {
      // Makes sure we return a Number instead of a String
      return +value
    }
  }
}
</script>

<style lang="scss">
.form-control-bold {
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
    border-radius: 0;
    height: 40px;

    &.is-invalid ~ .form-control-bold-label {
      color: $gray-500 !important;
    }

    &:focus {
      outline: none;
      color: $primary;
      border-color: inherit;
      // border-bottom: 1px $border-color solid;
      box-shadow: none;
    }

    &::placeholder {
      color: $gray-500;
      font-weight: normal;
      font-size: 1rem;
    }
  }

  .form-control-bold-label {
    font-weight: normal;
    display: block;
    text-align: center;
    color: $gray-500;
  }

}
</style>
