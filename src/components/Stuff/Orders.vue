<template>
  <OrdersSearch @search-orders="searchOrders" />
  <OrdersHeader />
  <div class="orders">
    <OrderItem v-for="order in orders" :key="order.order_id" :order="order" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OrdersSearch from '@/components/Stuff/OrdersSearch.vue'
import OrdersHeader from '@/components/Stuff/OrdersHeader.vue'
import OrderItem from '@/components/Stuff/OrderItem.vue'

export default {
  name: 'AddOrder',
  components: {
    OrdersSearch,
    OrdersHeader,
    OrderItem
  },
  beforeMount() {
    this.getAllOrders()
  },
  computed: {
    ...mapGetters({
      orders: 'stuff/orders'
    })
  },
  methods: {
    ...mapActions({
      getAllOrders: 'stuff/getAllOrders'
    }),
    searchOrders(searchString) {
      this.getAllOrders({ search: searchString })
    }
  }
}
</script>

<style scoped lang="scss">
.search {
  &__input {
    width: 90%;
  }
  &__btn {
    width: 10%;
    border: none;
    background-color: #2c3e50;
    color: white;
    padding: 0.5em 1em;
    font-size: 1rem;
    border: 1px solid #2c3e50;
    cursor: pointer;
  }
}

.orders {
  width: 100%;
  height: 76.5vh;

  overflow-y: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
