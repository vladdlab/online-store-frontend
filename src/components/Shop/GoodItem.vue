<template>
  <div class="good">
    <div class="good__name">{{ good.name }}</div>
    <div class="good__brief_desc">{{ good.brief_desc }}</div>
    <div class="good__category">{{ good.Category.name }}</div>
    <div class="good__amount">{{ good.GoodOrder.good_amount }}</div>
    <div class="good__sale_cost">{{ good.sale_cost }}</div>
  </div>
</template>

<script>
export default {
  name: 'Good',
  props: {
    good: {
      required: true,
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.good {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr;

  padding: 1em 0.5em;
  border: 1px solid #2c3e50;
  font-size: 1rem;
  outline: none;
  transition: all ease-in-out 0.15s;
  box-sizing: border-box;
  margin-bottom: 0.5em;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 3px 0px #2c3e50;
    background: #2c3e50;
    color: white;
  }
}
</style>
