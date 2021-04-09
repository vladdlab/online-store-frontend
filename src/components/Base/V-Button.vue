<template>
  <button>
    <slot name="text" :text="text"></slot>
    <slot name="icon"> :)</slot>
  </button>
</template>

<script>
export default {
  data() {
    return {
      text: 'В корзину'
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  border: none;
  background-color: #2c3e50;
  color: white;
  padding: 0.5em 1em;
  font-size: 1rem;
  border: 1px solid #2c3e50;
  cursor: pointer;
  z-index: 2;

  margin-top: auto;
  align-self: flex-end;

  &:disabled {
    border: 1px solid #5c646e;
    background-color: #5c646e;
    cursor: not-allowed;
  }
}
</style>
