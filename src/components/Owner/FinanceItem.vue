<template>
  <div class="finance">
    <div class="finance__id">
      {{ finance.check_date.slice(0, 10) }}
    </div>
    <div class="finance__name">
      {{ finance.profit }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Finance',
  props: {
    finance: {
      required: true,
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.finance {
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  padding: 1em 0.5em;
  bfinance: 1px solid #2c3e50;
  font-size: 1rem;
  outline: none;
  transition: all ease-in-out 0.15s;
  box-sizing: bfinance-box;
  margin-bottom: 0.5em;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 3px 0px #2c3e50;
    background: #2c3e50;
    color: white;
  }
}
</style>
