<template>
  <label for="name" v-if="label">{{ label }}</label>
  <input
    v-bind="{
      ...$attrs,
      onInput: $event => $emit('update:modelValue', $event.target.value)
    }"
    class="good__input"
    :value="modelValue"
    id="name"
    :placeholder="label"
  />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>

<style>
.good__input {
  width: 100%;
  max-width: 100%;
  min-width: 100%;
}
</style>
