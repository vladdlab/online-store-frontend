<template>
  <CatalogHeader />
  <section class="cart">
    <h1>Корзина:</h1>
    <main class="cart__main">
      <section class="cart__list">
        <CartItem v-for="item in cart" :key="item.good.good_id" :item="item" />
      </section>
      <aside class="cart__aside">
        <div class="cart__cost">
          <h3>Общая стоимость:</h3>
          <h3>{{ `${cartSum} ₽` }}</h3>
        </div>
        <button class="cart__order-btn" @click="handleCreate">
          Оформить заказ
        </button>
        <p class="cart__secondary">
          Доступные способы и время доставки можно выбрать при оформлении заказа
        </p>
      </aside>
    </main>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import CartItem from '@/components/Shop/CartItem.vue'
import CatalogHeader from '@/components/Shop/CatalogHeader.vue'

export default {
  name: 'Cart',
  components: {
    CartItem,
    CatalogHeader
  },
  computed: {
    ...mapGetters({
      cart: 'cart/cart',
      user: 'login/user'
    }),
    goodsInCart() {
      return this.cart.reduce(
        (totalAmount, item) => totalAmount + item.amount,
        0
      )
    },
    cartSum() {
      return this.cart.reduce(
        (sum, item) => sum + item.good.sale_cost * item.amount,
        0
      )
    }
  },
  methods: {
    ...mapActions({
      createOrder: 'cart/createOrder'
    }),
    ...mapMutations({
      clearCart: 'cart/CLEAR_CART'
    }),
    handleCreate() {
      const goods = this.cart.map(item => {
        return {
          amount: item.amount,
          good_id: item.good.good_id
        }
      })
      this.createOrder({
        address: '6e40d6cd-8e27-48bc-bc38-19fe0005d7fe',
        customer: this.user.id,
        sum: this.cartSum,
        pay_type: 'pay-on-deliv',
        status: 'in-process',
        goods: goods,
        check_date: '2020-12-11'
      })
        .then(response => {
          this.clearCart()
          console.log(response)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.cart {
  max-width: 70vw;
  min-height: 100px;
  margin: 2em auto;

  h1 {
    text-align: left;
  }

  &__main {
    margin-top: 1em;

    display: grid;
    grid-template-columns: 5fr 2fr;
  }

  &__order-btn {
    width: 100%;
    border: none;
    background-color: #2c3e50;
    color: white;
    padding: 1em 1.5em;
    font-size: 1rem;
    border: 1px solid #2c3e50;
    cursor: pointer;
    z-index: 2;

    &:disabled {
      border: 1px solid #5c646e;
      background-color: #5c646e;
      cursor: not-allowed;
    }
  }

  &__cost {
    display: flex;
    justify-content: space-between;
  }

  &__secondary {
    font-size: 0.9rem;
    color: thistle;
    text-align: left;
    margin: 0.5em 0;
  }
}
</style>
