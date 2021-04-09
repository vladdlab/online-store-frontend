<template>
  <div>
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      id="checkbox"
    />
    <label v-if="label" for="checkbox">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style></style>
