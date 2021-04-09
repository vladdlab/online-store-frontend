<template>
  <div
    class="good"
    @click="$router.push({ name: 'stuffgood', params: { id: good.good_id } })"
  >
    <img :src="defaultPhoto.src" :alt="defaultPhoto.alt" />

    <section class="good__decription">
      <div class="good__category">{{ good.Category.name }}</div>
      <div class="good__name">{{ good.name }}</div>
      <div class="good__desc">{{ good.brief_desc }}</div>
    </section>

    <section>
      <div class="good__sale_cost">{{ `${good.sale_cost} ₽` }}</div>
    </section>

    <section>
      <div class="good__amount-picker">
        <button class="good__minus" @click.stop="decrementGood">-</button>
        <div class="good__amount">{{ `${item.amount} шт.` }}</div>
        <button class="good__plus" @click.stop="incrementGood">+</button>
      </div>
    </section>

    <button class="good__remove" @click.stop="removeGood">&#215;</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CatalogItem',
  data() {
    return {
      currentAmount: 0
    }
  },
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      cart: 'cart/cart'
    }),
    good() {
      return this.item.good
    },
    isAvailable() {
      return this.good.amount - this.currentAmount
    },
    defaultPhoto() {
      return {
        src: this.good.Photos[0]
          ? 'http://localhost:8002/uploads/' + this.good.Photos[0].url
          : require('../../assets/picture_not_available.png'),
        alt: this.good.Photos[0]
          ? this.good.Photos[0].brief_desc
          : 'Фотография изделия'
      }
    }
  },
  methods: {
    ...mapMutations({
      addTooCart: 'cart/ADD_TO_CART'
    }),
    addToCart() {
      this.currentAmount += 1
      if (this.currentAmount === 1)
        this.cart.push({ good: this.good, amount: this.currentAmount })
      else {
        this.cart.find(
          item => item.good.good_id === this.good.good_id
        ).amount += 1
      }
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    removeGood() {
      const goodToDelete = this.cart.findIndex(
        item => item.good.good_id === this.good.good_id
      )
      this.cart.splice(goodToDelete, 1)
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    decrementGood() {
      if (this.item.amount > 1) {
        this.cart.find(
          item => item.good.good_id === this.good.good_id
        ).amount -= 1
        localStorage.setItem('cart', JSON.stringify(this.cart))
      }
    },
    incrementGood() {
      this.cart.find(
        item => item.good.good_id === this.good.good_id
      ).amount += 1
      localStorage.setItem('cart', JSON.stringify(this.cart))
    }
  }
}
</script>

<style lang="scss" scoped>
.good {
  // min-height: 60vh;
  // min-width: 100%;
  width: 97%;
  height: 100px;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1.5fr 0.3fr;

  padding: 0.5em;
  margin-bottom: 0.5em;
  font-size: 1rem;
  outline: none;
  transition: all ease-in-out 0.15s;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 0 4px 0px #2c3e50;
  }

  img {
    width: 100%;
    height: 100%;
    background: rgb(250, 250, 250);

    object-fit: cover;
  }

  &__decription {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 0 1em;
    box-sizing: border-box;
    width: 100%;
  }

  &__sale_cost {
    font-size: 1.5rem;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__category {
    font-size: 0.9rem;
    color: thistle;
  }

  &__name {
    font-size: 1.5rem;
  }

  &__amount {
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__addbtn {
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

  &__remove {
    border: none;
    background: transparent;
    color: indianred;
    cursor: pointer;
    font-size: 1.5rem;

    &:hover {
      color: red;
    }
  }

  &__amount-picker {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
  }

  &__minus,
  &__plus {
    width: 2.2em;
    height: 2.2em;
    border: none;
    background-color: #2c3e50;
    color: white;
    font-size: 1rem;
    border: 1px solid #2c3e50;
    cursor: pointer;
    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__amount {
    height: 2.2em;
    padding: 0 0.5em;

    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
