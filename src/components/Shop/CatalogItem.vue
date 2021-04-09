<template>
  <div
    class="good"
    @click="$router.push({ name: 'stuffgood', params: { id: good.good_id } })"
  >
    <img :src="defaultPhoto.src" :alt="defaultPhoto.alt" />

    <div class="good__decription">
      <div class="good__sale_cost">{{ `${good.sale_cost} ₽` }}</div>
      <div class="good__category">{{ good.Category.name }}</div>
      <div class="good__name">{{ good.name }}</div>

      <VButton
        v-if="currentAmount === 0"
        @click.stop="addToCart"
        :disabled="!isAvailable"
        text="В корзину"
      >
        <template v-slot:text="slotProps">{{ slotProps.text }}</template>
        <template v-slot:icon> :3</template>
      </VButton>
      <!-- <button @click.stop="addToCart" class="good__addbtn">
        В корзину
      </button> -->
      <div v-else class="good__amount-picker">
        <button class="good__minus" @click.stop="decrementGood">-</button>
        <div class="good__amount">{{ `${currentAmount} шт.` }}</div>
        <button class="good__plus" @click.stop="incrementGood">+</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue'
import stuff from '@/composable/stuff'
import { useStore } from 'vuex'
import VButton from '@/components/Base/V-Button.vue'

export default {
  name: 'CatalogItem',
  props: {
    good: {
      required: true,
      type: Object,
      validator: propValue => {
        const Photo = propValue.Photos[0]
        const hasCorrectName = Photo && Photo.url.indexOf('photo') > -1
        const isCorrectExtension =
          Photo &&
          (Photo.url.endsWith('.png') ||
            Photo.url.endsWith('.jpg') ||
            Photo.url.endsWith('.jpeg'))
        return hasCorrectName && isCorrectExtension
      }
    }
  },
  setup(props) {
    let currentAmount = ref(0)
    const store = useStore()
    const cart = store.getters['cart/cart']
    const isAvailable = computed(() => {
      return props.good.amount - currentAmount.value
    })

    onBeforeMount(() => {
      const item = cart.find(item => item.good.good_id === props.good.good_id)
      if (item) currentAmount.value = item.amount
    })

    const defaultPhoto = computed(() => {
      return {
        src: props.good.Photos[0]
          ? 'http://localhost:8002/uploads/' + props.good.Photos[0].url
          : require('../../assets/picture_not_available.png'),
        alt: props.good.Photos[0]
          ? props.good.Photos[0].brief_desc
          : 'Фотография изделия'
      }
    })

    function addToCart() {
      currentAmount.value = 1
      cart.push({ good: props.good, amount: currentAmount })
      localStorage.setItem('cart', JSON.stringify(cart))
    }

    function decrementGood() {
      currentAmount.value -= 1
      cart.find(item => item.good.good_id === props.good.good_id).amount -= 1
      localStorage.setItem('cart', JSON.stringify(cart))
    }

    function incrementGood() {
      console.log(currentAmount.value)
      currentAmount.value += 1
      console.log(currentAmount.value)
      cart.find(item => item.good.good_id === props.good.good_id).amount += 1
      localStorage.setItem('cart', JSON.stringify(cart))
    }

    return {
      currentAmount,
      addToCart,
      decrementGood,
      incrementGood,
      isAvailable,
      defaultPhoto
    }
  },
  components: {
    VButton
  }
}
</script>

<style lang="scss" scoped>
.good {
  height: 60vh;
  width: 100%;

  padding: 0.5em;
  font-size: 1rem;
  outline: none;
  transition: all ease-in-out 0.15s;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 0 4px 0px #2c3e50;
  }

  img {
    width: 100%;
    height: 55%;
    background: rgb(250, 250, 250);

    object-fit: cover;
  }

  &__decription {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 1em;
    box-sizing: border-box;
    width: 100%;
    height: 45%;
  }

  &__sale_cost {
    font-size: 1.5rem;
    margin-bottom: 0.5em;
  }

  &__category {
    font-size: 0.9rem;
    color: thistle;
  }

  &__name {
    font-size: 1.5rem;
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

  &__amount-picker {
    margin-top: auto;
    align-self: flex-end;
    display: flex;
    flex-direction: row;
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
