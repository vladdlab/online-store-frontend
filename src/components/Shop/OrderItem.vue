<template>
  <div
    class="order"
    @click="$router.push({ name: 'userorder', params: { id: order.order_id } })"
  >
    <div class="order__id">
      {{ order.order_id.slice(0, 8) }}
    </div>
    <div class="order__name">
      {{ order.Customer.last_name + ' ' + order.Customer.first_name }}
    </div>
    <div class="order__status">{{ order.status }}</div>
    <div class="order__pay_type">{{ order.pay_type }}</div>
    <div class="order__createdAt">
      {{ order.check_date && order.check_date.slice(0, 10) }}
    </div>
    <div class="order__sum">{{ order.sum }}</div>
  </div>
</template>

<script>
export default {
  name: 'Order',
  props: {
    order: {
      required: true,
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.order {
  display: grid;
  grid-template-columns: repeat(6, 1fr);

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
