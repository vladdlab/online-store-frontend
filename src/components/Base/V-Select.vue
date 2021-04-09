<template>
  <select @change="logEvent">
    <option value="" disabled>-</option>
    <option
      v-for="category in categories"
      :key="category.cate_id"
      :value="JSON.stringify(category)"
      :selected="category.cate_id === modalValue.cate_id"
      >{{ category.name }}</option
    >
  </select>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    modalValue: {
      type: Object,
      default: () => ({})
    }
  },
  setup(_, { emit }) {
    const logEvent = event => {
      emit('update:modalValue', JSON.parse(event.target.value))
    }
    return { logEvent }
  }
}
</script>

<style></style>
