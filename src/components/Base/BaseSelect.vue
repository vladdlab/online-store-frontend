<template>
  <label for="category" v-if="label">{{ label }}</label>
  <select
    v-bind="{
      ...$attrs,
      onChange: event => $emit('update:modelValue', event.target.value)
    }"
    :value="modelValue"
  >
    <option disabled value="" :selected="modelValue === ''"
      >Выберите один из вариантов</option
    >
    <option
      v-for="option in options"
      :key="option.cate_id"
      :value="option.cate_id"
      :selected="modelValue === option.cate_id"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    modelValue: {
      type: [String, Object],
      default: ''
    }
  },
  methods: {
    handleChange(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style>
.good__input {
  width: 100%;
  max-width: initial;
  min-width: initial;
}
</style>
