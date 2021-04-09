<template>
  <label for="name">Название</label>
  <input
    v-bind="{
      ...$attrs,
      onInput: event => $emit('update:modalValue', event.target.value),
      onBlur: event => $emit('update:modalValue', event.target.value)
    }"
    :value="modalValue"
  />
</template>

<script>
export default {
  props: {
    modalValue: {
      type: [String, Number],
      default: ''
    }
  },
  mounted() {
    console.log(this.$attrs)
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
