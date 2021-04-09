<template>
  <input
    type="text"
    :value="atrName"
    @input="updateAtrName"
    placeholder="Название"
    class="good__input"
  />
  <input
    type="text"
    @input="updateAtrValue"
    :value="atrValue"
    placeholder="Значение"
    class="good__input"
  />
</template>

<script>
export default {
  props: {
    atrName: {
      type: [String, Number],
      default: ''
    },
    atrNameModifiers: {
      default: () => ({})
    },
    atrValue: {
      type: [String, Number],
      default: ''
    },
    atrValueModifiers: {
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const updateAtrName = event => {
      let val = event.target.value
      if (props.atrNameModifiers.capitalize) {
        val = val.toUpperCase()
      }

      emit('update:atrName', val)
    }
    const updateAtrValue = event => {
      let val = event.target.value
      if (props.atrValueModifiers.reverse) {
        val = val
          .split('')
          .reverse()
          .join('')
      }
      if (props.atrValueModifiers.capitalize) {
        val = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
      }

      emit('update:atrValue', val)
    }

    return { updateAtrName, updateAtrValue }
  }
}
</script>

<style></style>
