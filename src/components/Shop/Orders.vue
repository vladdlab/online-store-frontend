<template>
  <div class="orders__info">
    <h1>Ваши заказы:</h1>
    <div class="orders">
      <OrderItem v-for="order in orders" :key="order.order_id" :order="order" />
    </div>
    <button @click="logout">Выход</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OrderItem from '@/components/Shop/OrderItem.vue'

export default {
  name: 'UserOrders',
  beforeMount() {
    this.getAllUserOrders(this.user.id)
  },
  computed: {
    ...mapGetters({
      user: 'login/user',
      orders: 'user/orders'
    })
  },
  methods: {
    ...mapActions({
      getAllUserOrders: 'user/getAllUserOrders'
    }),
    logout() {
      localStorage.removeItem('jwt')
      localStorage.removeItem('user')
      window.location.reload()
    }
  },
  components: {
    OrderItem
  }
}
</script>

<style scoped lang="scss">
.orders__info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1em 2em;
  // justify-content: center;

  font-family: 'Open Sans', sans-serif;

  h1 {
    font-family: 'Poiret One', cursive;
  }

  p {
    width: 60%;
  }

  button {
    border: none;
    background-color: #2c3e50;
    color: white;
    padding: 0.5em 1em;
    cursor: pointer;
    margin-top: 1em;
  }
}

.orders {
  width: 100%;
  height: 70vh;

  overflow-y: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
