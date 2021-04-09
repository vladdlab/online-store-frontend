<template>
  <div class="header">
    <router-link :to="{ name: 'About' }" class="header__item">
      {{ `Домашняя` }}
    </router-link>
    <router-link :to="{ name: 'catalog' }" class="header__item">
      {{ `Каталог` }}
    </router-link>
    <router-link :to="{ name: 'cart' }" class="header__item header__cart">
      {{ `Корзина (${goodsInCart})` }}
    </router-link>
    <router-link :to="{ name: 'hellouser' }" class="header__item header__user">
      <img src="../../assets/user.svg" alt="" />
    </router-link>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'CatalogHeader',
  setup() {
    const store = useStore()
    console.log(store)
    const goodsInCart = computed(() => {
      return store.getters['cart/cart'].reduce(
        (totalAmount, item) => totalAmount + item.amount,
        0
      )
    })
    return { goodsInCart }
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 8vh;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 1em;
  box-sizing: border-box;

  background: #2c3e50;

  &__item {
    height: 100%;
    padding: 0 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;

    color: white;
    cursor: pointer;
    text-decoration: none;

    transition: all ease-in-out 0.15s;

    &:visited {
      color: white;
      cursor: pointer;
      text-decoration: none;
    }

    &:hover {
      -webkit-box-shadow: 0px -9px 0px 0px rgba(255, 255, 255, 0.2) inset;
      -moz-box-shadow: 0px -9px 0px 0px rgba(255, 255, 255, 0.2) inset;
      box-shadow: 0px -6px 0px 0px rgba(255, 255, 255, 1) inset;
    }
  }

  &__cart {
    margin-left: auto;
  }

  &__user {
    img {
      color: #2c3e50;
      width: 1em;
      height: 1em;
    }
  }
}
</style>
