<template>
  <div>
    <component
      v-for="option in options"
      :key="option.value"
      :is="vertical ? 'div' : 'span'"
    >
      <BaseRadio
        :label="option.label"
        :value="option.value"
        :name="name"
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </component>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    modelValue: {
      type: [Number, String],
      required: true
    },
    vertical: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style></style>
